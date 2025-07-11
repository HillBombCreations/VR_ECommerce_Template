import { useEffect, useState, useContext } from "react";
import { Box, Typography, CardMedia, Button, IconButton, Dialog, Slide, CircularProgress } from "@mui/material";
import { Close, CheckCircleOutline } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import PropTypes from 'prop-types';
import axios from "axios";
import CartContext from "../../../context/cartContext";

const StyledDialog = styled(Dialog)({
    "& .MuiPaper-root": {
        position: "absolute",
        top: "10px",
        right: "10px",
        width: "20vw",
        borderRadius: "12px",
        padding: "16px",
        backgroundColor: "#fff",
        boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
        overflow: "hidden",
    },
});

const HeaderContainer = styled(Box)({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "12px",
});

const ProductInfoContainer = styled(Box)({
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "20px",
});

const ViewBagButton = styled(Button)({
    width: "100%",
    backgroundColor: "#f5f5f5",
    color: "#333",
    marginBottom: "10px",
    fontWeight: "bold",
    borderRadius: "25px",
    "&:hover": {
        backgroundColor: "#e0e0e0",
    },
});

const CheckoutButton = styled(Button)({
    width: "100%",
    backgroundColor: "#000",
    color: "#fff",
    fontWeight: "bold",
    borderRadius: "25px",
    "&:hover": {
        backgroundColor: "#333",
    },
});

const FloatingCartDialog = ({ open, onClose, product, quantity, cartCount, variant }) => {
    const { cartItems, setOpenCartMenu } = useContext(CartContext);
    const API_URL = import.meta.env.VITE_API_URL;
    const key = import.meta.env.VITE_CLIENT_KEY;
    const stripeKey = import.meta.env.VITE_STRIPE_KEY;

    const [loadingCheckout, setLoadingCheckout] = useState(false);
    const [disableButtons, setDisableButtons] = useState(false);
    const handleOpenCart = () => {
        onClose();
        setOpenCartMenu(true);
    }

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
                { products: products, stripeKey: stripeKey },
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
        <StyledDialog open={open} onClose={onClose} TransitionComponent={Slide} transitionDuration={300}>
            <Box>
                <HeaderContainer>
                    <Box display="flex" alignItems="center" gap={1}>
                        <CheckCircleOutline sx={{ color: "#4caf50" }} />
                        <Typography fontWeight="bold">Added to Bag</Typography>
                    </Box>
                    <IconButton onClick={onClose} disabled={loadingCheckout}>
                        <Close />
                    </IconButton>
                </HeaderContainer>
                {product && (
                    <ProductInfoContainer>
                        <CardMedia
                        component="img"
                        src={getSafeFieldValue("productImage")?.currentFile?.source || '/siteAssets/placeHolder.png'}
                        alt={getSafeFieldValue("name")}
                        sx={{ width: 60, height: 60, borderRadius: "8px" }}
                        />
                        <Box>
                        <Typography fontWeight="bold">
                            {getSafeFieldValue("name")}
                        </Typography>
                        <Typography fontSize="0.875rem" color="textSecondary">
                            {quantity} × ${Number(getSafeFieldValue("price")).toFixed(2)}
                        </Typography>
                        </Box>
                    </ProductInfoContainer>
                )}

                {/* Actions */}
                <ViewBagButton
                    onClick={handleOpenCart}
                    disabled={disableButtons}
                >
                    View Bag ({cartCount})
                </ViewBagButton>
                
                <CheckoutButton
                    onClick={handleCheckout}
                    disabled={disableButtons}
                >
                    {loadingCheckout ? (
                        <>
                            <CircularProgress size={20} sx={{ color: "#fff" }} />
                        </>
                    ) : (
                        "Checkout"
                    )}
                </CheckoutButton>
            </Box>
        </StyledDialog>
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