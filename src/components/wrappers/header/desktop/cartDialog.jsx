import { forwardRef, useContext, useMemo, useState } from 'react';
import {
    Dialog, Paper, Slide, IconButton, Box,
    Typography, Button, Divider,
    CircularProgress
} from '@mui/material';
import axios from "axios";
import { Close, Remove, Add, Delete } from '@mui/icons-material';
import CartContext from '../../../../context/cartContext';
import PropTypes from 'prop-types'
import { styled } from '@mui/material/styles';
import FetchedDataContext from '../../../../context/fetchedDataContext';

const StyledPaper = styled(Paper)(() => ({
  height: '100%',
  width: '35vw',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'var(--color-surface)',
  boxShadow: 'var(--shadow-medium)',
  borderRadius: 'var(--radius-base)',
}));

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

const CartDialog = ({ open, onClose }) => {
    const { siteLogo } = useContext(FetchedDataContext);
    const { cartItems, setCartItems } = useContext(CartContext);
    const [loadingCheckout, setLoadingCheckout] = useState(false);
    const API_URL = 'https://client.vivreal.io';
    const key = import.meta.env.VITE_CLIENT_KEY;
    const stripeKey = import.meta.env.VITE_STRIPE_KEY;

    const handleUpdateCart = (productId, type) => {
        let tempCartItems = { ...cartItems };
        if (type === 'add') {
            tempCartItems[productId].quantity += 1;
        } else {
            tempCartItems[productId].quantity -= 1;
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
                products,
                stripeKey,
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
    };

    const resolvePrice = (item) => {
        return typeof item.price === 'object' && item.variant
            ? item.price[item.variant]
            : item.price;
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
            sx={{ width: '35vw', display: 'flex', marginLeft: 'auto' }}
        >
            <StyledPaper>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: 'var(--color-primary)',
                    padding: '16px'
                }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'var(--color-text-inverse)' }}>
                        Your Cart
                    </Typography>
                    <IconButton sx={{ color: 'var(--color-text-inverse)' }} onClick={onClose}>
                        <Close />
                    </IconButton>
                </Box>
                <Box sx={{ flexGrow: 1, overflowY: 'auto', padding: '16px' }}>
                    {Object.keys(cartItems).length === 0 ? (
                        <Typography
                            variant="body1"
                            sx={{
                                textAlign: 'center',
                                marginTop: '50px',
                                color: 'var(--color-text-secondary)'
                            }}
                        >
                            Your cart is empty. Start shopping!
                        </Typography>
                    ) : (
                        Object.entries(cartItems).map(([key, value], index) => (
                            <div key={index}>
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
                                        <Box sx={{ display: 'flex', flexDirection: 'column', width: '20%', alignItems: 'center' }}>
                                            <img src={value?.imageSrc || siteLogo} alt={value.name} style={{ width: '100%', height: 'auto', borderRadius: 8 }} />
                                        </Box>
                                        <Box sx={{ display: 'flex', flexDirection: 'column', width: '50%', alignItems: 'start', marginLeft: '20px' }}>
                                            <Box>
                                                <Typography sx={{ fontSize: "1.5rem" }}>{value.name}</Typography>
                                                <Typography variant="h6" sx={{ color: 'var(--color-text-secondary)' }}>
                                                    ${resolvePrice(value)} each
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Box sx={{ display: 'flex', flexDirection: 'column', width: '30%', alignItems: 'center' }}>
                                            <Box sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                border: '2px solid var(--color-secondary)',
                                                borderRadius: '20px',
                                                padding: '4px 12px',
                                                gap: 1
                                            }}>
                                                <IconButton
                                                    sx={{ color: 'var(--color-primary)' }}
                                                    onClick={() =>
                                                        value.quantity > 1
                                                            ? handleUpdateCart(key, 'remove')
                                                            : removeFromCart(key)
                                                    }
                                                >
                                                    {value.quantity > 1 ? <Remove /> : <Delete />}
                                                </IconButton>
                                                <Typography sx={{ fontSize: '1rem', fontWeight: 'bold' }}>{value.quantity}</Typography>
                                                <IconButton
                                                    sx={{ color: 'var(--color-primary)' }}
                                                    onClick={() => handleUpdateCart(key, 'add')}
                                                >
                                                    <Add />
                                                </IconButton>
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box sx={{
                                        display: 'flex',
                                        marginTop: '10px',
                                        flexDirection: 'row',
                                        width: '100%',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }} />
                                    <Divider sx={{ color: 'var(--color-surface-alt)' }} />
                                </Box>
                            </div>
                        ))
                    )}
                </Box>
                {Object.keys(cartItems).length > 0 && (
                    <Box sx={{
                        padding: '16px',
                        borderTop: '1px solid var(--color-surface-alt)',
                        display: 'flex',
                        flexDirection: 'row',
                        background: 'var(--color-surface)',
                        textAlign: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                            Subtotal:
                        </Typography>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'var(--color-primary)' }}>
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
                            width: '100%',
                            backgroundColor: 'var(--color-primary)',
                            color: 'var(--color-text-inverse)',
                            padding: '14px',
                            fontSize: "1rem",
                            '&:hover': { backgroundColor: 'var(--color-secondary)' },
                        }}
                        disabled={Object.keys(cartItems).length === 0 || loadingCheckout}
                        onClick={handleCheckout}
                    >
                        {
                            loadingCheckout
                                ? <CircularProgress size={20} sx={{ color: 'var(--color-primary)' }} />
                                : 'Proceed to Checkout'
                        }
                    </Button>
                </Box>
            </StyledPaper>
        </Dialog>
    );
};

CartDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func
}
export default CartDialog;