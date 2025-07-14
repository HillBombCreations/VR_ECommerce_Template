import { useEffect, useState, useContext, forwardRef } from "react";
import {
    Box, Typography, CardMedia,
    Button, IconButton, Dialog,
    Slide, CircularProgress, useMediaQuery
} from "@mui/material";
import { Close, CheckCircleOutline } from "@mui/icons-material";
import { styled, useTheme } from "@mui/material/styles";
import axios from "axios";
import CartContext from "../../../context/cartContext";
import PropTypes from 'prop-types';

const HeaderContainer = styled(Box)({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "12px",
});

const ProductInfoContainer = styled(Box)(() => ({
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "20px",
}));

const ViewBagButton = styled(Button)(() => ({
    width: "100%",
    backgroundColor: "var(--color-surface-alt)",
    color: "var(--color-text-primary)",
    marginBottom: "10px",
    fontWeight: "bold",
    borderRadius: "25px",
    padding: "12px",
}));

const CheckoutButton = styled(Button)(() => ({
    width: "100%",
    backgroundColor: "var(--color-text-primary)",
    color: "var(--color-text-inverse)",
    fontWeight: "bold",
    borderRadius: "25px",
    padding: "12px",
}));

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const FloatingCartDialog = ({ open, onClose, product, quantity, cartCount, variant }) => {
    const { cartItems, setOpenCartMenu } = useContext(CartContext);
    const API_URL = import.meta.env.VITE_API_URL;
    const key = import.meta.env.VITE_CLIENT_KEY;
    const stripeKey = import.meta.env.VITE_STRIPE_KEY;

    const [loadingCheckout, setLoadingCheckout] = useState(false);
    const [disableButtons, setDisableButtons] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const handleOpenCart = () => {
        onClose();
        setOpenCartMenu(true);
    };

    const getSafeFieldValue = (key) => {
        if (
          typeof product?.[key] === "object" &&
          variant &&
          Object.keys(product[key]).includes(variant)
        ) return product[key][variant];
        if (variant && key === 'name') return `${product[key]} (${variant})`
        return product?.[key];
    };

    const handleCheckout = async () => {
        setLoadingCheckout(true);
        setDisableButtons(true);

        const products = Object.values(cartItems).map((item) => ({
            price: typeof item.priceID === 'object' && item.variant
              ? item.priceID[item.variant]
              : item.priceID,
            quantity: item.quantity,
        }));

        try {
            const { data } = await axios.post(
                `${API_URL}/tenant/createCheckoutSession`,
                { products: products, stripeKey: stripeKey, requiresShipping: false },
                { headers: { Authorization: key, "Content-Type": "application/json" } }
            );

            if (data && !(data.status && data.status === 400)) {
                window.location.replace(data);
            } else {
                console.error("Error creating checkout session:", data);
                setLoadingCheckout(false);
                setDisableButtons(false);
            }
        } catch (error) {
            console.error("Checkout error:", error);
            setLoadingCheckout(false);
            setDisableButtons(false);
        }
    };

    useEffect(() => {
        if (open && !loadingCheckout) {
            const timer = setTimeout(onClose, 10000);
            return () => clearTimeout(timer);
        }
    }, [open, onClose, loadingCheckout]);

    return (
        <Dialog
            fullScreen
            open={open}
            onClose={onClose}
            TransitionComponent={Transition}
            sx={{
                width: '100vw',
                height: '40vh',
                display: 'flex',
                "& .MuiPaper-root": {
                    width: "100vw",
                    height: '40vh',
                    borderRadius: "12px",
                    padding: "16px",
                    backgroundColor: "var(--color-surface)",
                    boxShadow: "0px 8px 16px var(--shadow-medium)",
                    overflow: "hidden",
                    transition: "all 0.3s ease-in-out",
                },
            }}
        >
            <Box sx={{ width: '90%', marginTop: '10px' }}>
                {/* Header */}
                <HeaderContainer>
                    <Box display="flex" alignItems="center" gap={1}>
                        <CheckCircleOutline sx={{ color: "#4caf50" }} />
                        <Typography fontWeight="bold" sx={{ fontSize: isMobile ? "1rem" : "1.2rem" }}>
                            Added to Bag
                        </Typography>
                    </Box>
                    <IconButton onClick={onClose} disabled={loadingCheckout}>
                        <Close />
                    </IconButton>
                </HeaderContainer>

                {/* Product Info */}
                {product && (
                    <ProductInfoContainer>
                        <CardMedia
                            component="img"
                            src={getSafeFieldValue("productImage")?.currentFile?.source || '/siteAssets/placeHolder.png'}
                            alt={getSafeFieldValue("name")}
                            sx={{
                                width: isMobile ? 80 : 60,
                                height: isMobile ? 80 : 60,
                                borderRadius: "8px",
                            }}
                        />
                        <Box>
                            <Typography fontWeight="bold" sx={{ fontSize: isMobile ? "1rem" : "1.1rem" }}>
                                { variant ? `${getSafeFieldValue("name")} (${variant})` : getSafeFieldValue("name")}
                            </Typography>
                            <Typography fontSize="0.875rem" color="textSecondary">
                                {quantity} × ${Number(getSafeFieldValue("price")).toFixed(2)}
                            </Typography>
                        </Box>
                    </ProductInfoContainer>
                )}

                {/* Actions */}
                <ViewBagButton onClick={handleOpenCart} disabled={disableButtons}>
                    View Bag ({cartCount})
                </ViewBagButton>

                <CheckoutButton onClick={handleCheckout} disabled={disableButtons}>
                    {loadingCheckout ? (
                        <>
                            <CircularProgress size={20} sx={{ color: "var(--color-surface)" }} />
                        </>
                    ) : (
                        "Checkout"
                    )}
                </CheckoutButton>
            </Box>
        </Dialog>
    );
};

export default FloatingCartDialog;

FloatingCartDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    cartCount: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    product: PropTypes.object,
    variant: PropTypes.string
};