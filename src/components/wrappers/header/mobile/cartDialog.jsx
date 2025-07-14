import { forwardRef, useContext, useMemo, useState } from 'react';
import {
    Dialog, Paper, Slide, IconButton, Box,
    Typography, Button, Divider, CircularProgress
} from '@mui/material';
import axios from "axios";
import { Close, Remove, Add, Delete } from '@mui/icons-material';
import CartContext from '../../../../context/cartContext';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

// eslint-disable-next-line react/prop-types
const CartDialog = ({ open, onClose }) => {
    const { cartItems, setCartItems } = useContext(CartContext);
    const [loadingCheckout, setLoadingCheckout] = useState(false);
    const API_URL = import.meta.env.VITE_API_URL;
    const key = import.meta.env.VITE_CLIENT_KEY;
    const stripeKey = import.meta.env.VITE_STRIPE_KEY;

    const handleUpdateCart = (productId, type) => {
        let tempCartItems = { ...cartItems };
        if (type === 'add') {
            tempCartItems[productId].quantity = tempCartItems[productId].quantity + 1;
        } else {
            tempCartItems[productId].quantity = tempCartItems[productId].quantity - 1;
        }    
        setCartItems(tempCartItems);
    };

    const removeFromCart = (productId) => {
        let tempCartItems = { ...cartItems };
        delete tempCartItems[productId];
        setCartItems(tempCartItems);
    };

    const handleCheckout = async () => {
        setLoadingCheckout(true);
        const products = Object.values(cartItems).map((item) => ({
            price: typeof item.priceID === 'object' && item.variant
              ? item.priceID[item.variant]
              : item.priceID,
            quantity: item.quantity,
        }));
        const { data } = await axios.post(
            `${API_URL}/tenant/createCheckoutSession`,
            {
                products: products,
                stripeKey: stripeKey,
                requiresShipping: false
            },
            {
                headers: {
                    Authorization: key,
                    "Content-Type": "application/json",
                },
            }
        );
        
        if (data && !(data.status && data.status === 400)) window.location.replace(data);
        setLoadingCheckout(false);
    }

    const resolvePrice = (item) => {
        if (typeof item.price === 'object' && item.variant) {
          return item.price[item.variant];
        }
        return item.price;
    };

    const subtotal = useMemo(() => {
        return Object.values(cartItems).reduce((acc, item) => acc + item.price * item.quantity, 0);
    }, [cartItems]);

    return (
        <Dialog
            fullScreen
            open={open}
            onClose={onClose}
            TransitionComponent={Transition}
            sx={{ width: '100vw', display: 'flex', marginLeft: 'auto' }}
        >
            <Paper sx={{ height: '100%', width: '100vw', display: 'flex', overflowY: 'auto', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--color-primary)', padding: '16px' }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'var(--color-text-inverse)' }}>Your Cart</Typography>
                    <IconButton sx={{ color: 'var(--color-text-inverse)' }} onClick={onClose}>
                        <Close />
                    </IconButton>
                </Box>
                <Box sx={{ flexGrow: 1, overflowY: 'auto', width: '90%', padding: '16px' }}>
                    {Object.keys(cartItems).length === 0 ? (
                        <Typography variant="body1" sx={{ textAlign: 'center', marginTop: '50px', color: 'var(--color-text-secondary)' }}>
                            Your cart is empty. Start shopping!
                        </Typography>
                    ) : (
                        Object.entries(cartItems).map(([key, value]) => (
                            <div key={key}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        width: '100%',
                                        paddingBottom: '20px',
                                        borderRadius: '8px',
                                        marginBottom: '8px'
                                    }}
                                >
                                    <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'center' }}>
                                        <Box sx={{ display: 'flex', flexDirection: 'column', width: '30%' }}>
                                            <img src={value?.imageSrc || '/siteAssets/placeHolder.png'} alt={value.name} style={{ width: '100%', height: 'auto', borderRadius: 8 }} />
                                        </Box>
                                        <Box sx={{ display: 'flex', flexDirection: 'column', width: '70%', marginLeft: '10vw' }}>
                                            <Typography sx={{ fontSize: "1.5rem" }}>{value.name}</Typography>
                                            <Typography variant="h6" sx={{ color: 'var(--color-text-secondary)' }}>${resolvePrice(value)} each</Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{ display: 'flex', marginTop: '20px', flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
                                         <Box sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            border: '2px solid var(--color-primary-hover)',
                                            borderRadius: '20px',
                                            padding: '4px 12px',
                                            gap: 1
                                        }}>
                                            <IconButton 
                                                sx={{ color: 'var(--color-primary)' }}
                                                onClick={() => value.quantity > 1 ? handleUpdateCart(key, 'remove') : removeFromCart(key)}
                                            >
                                                {value.quantity > 1 ? <Remove /> : <Delete />}
                                            </IconButton>
                                            <Typography sx={{ fontSize: '1rem', fontWeight: 'bold' }}>{value.quantity}</Typography>
                                            <IconButton sx={{ color: 'var(--color-primary)' }} onClick={() => handleUpdateCart(key, 'add')}>
                                                <Add />
                                            </IconButton>
                                        </Box>
                                    </Box>
                                </Box>
                                <Divider sx={{ color: 'var(--color-surface-alt)' }} />
                            </div>
                        ))
                    )}
                </Box>
                {Object.keys(cartItems).length > 0 && (
                    <Box sx={{ padding: '16px', borderTop: '1px solid var(--color-surface-alt)', display: 'flex', justifyContent: 'space-between', background: 'var(--color-surface)' }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            Subtotal:
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: "var(--color-primary)" }}>
                            ${subtotal.toFixed(2)}
                        </Typography>
                    </Box>
                )}
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    padding: '16px',
                    borderTop: '1px solid var(--color-surface-alt)',
                    background: 'var(--color-surface)'
                }}>
                    <Button
                        variant="contained"
                        sx={{
                            width: '90%',
                            backgroundColor: "var(--color-primary)",
                            color: "white",
                            padding: '14px',
                            fontSize: "1rem",
                            '&:hover': { backgroundColor: "var(--color-primary-hover)" },
                        }}
                        disabled={Object.keys(cartItems).length === 0}
                        onClick={handleCheckout}
                    >
                        {
                            loadingCheckout ?
                            <CircularProgress size={20} sx={{ color: "var(--color-primary)" }} />
                            :
                            'Proceed to Checkout'
                        }
                    </Button>
                </Box>
            </Paper>
        </Dialog>
    );
};

export default CartDialog;