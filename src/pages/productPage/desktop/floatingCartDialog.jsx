import { useEffect, useState, useContext } from "react";
import { Box, Typography, CardMedia, Button, IconButton, Dialog, Slide, CircularProgress } from "@mui/material";
import { Close, CheckCircleOutline } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import PropTypes from 'prop-types';
import axios from "axios";
import CartContext from "../../../context/cartContext";
import FetchedDataContext from "../../../context/fetchedDataContext";

const StyledDialog = styled(Dialog)({
  "& .MuiPaper-root": {
    position: "absolute",
    top: "10px",
    right: "10px",
    width: "20vw",
    borderRadius: "var(--radius-base)",
    padding: "16px",
    backgroundColor: "var(--color-surface)",
    boxShadow: "var(--shadow-medium)",
    overflow: "hidden",
    transition: "var(--transition-base)",
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
  backgroundColor: "var(--color-surface-alt)",
  color: "var(--color-text-primary)",
  marginBottom: "10px",
  fontWeight: "bold",
  borderRadius: "25px",
  transition: "var(--transition-base)",
  "&:hover": {
    backgroundColor: "var(--color-surface)",
  },
});

const CheckoutButton = styled(Button)({
  width: "100%",
  backgroundColor: "var(--color-text-primary)",
  color: "var(--color-text-inverse)",
  fontWeight: "bold",
  borderRadius: "25px",
  transition: "var(--transition-base)",
  "&:hover": {
    backgroundColor: "rgba(31, 41, 55, 0.8)",
  },
});

const FloatingCartDialog = ({ open, onClose, product, quantity, cartCount, variant }) => {
    const { siteLogo, businessInfo, integrationInfo } = useContext(FetchedDataContext)
    const { cartItems, setOpenCartMenu } = useContext(CartContext);
    const key = import.meta.env.VITE_CLIENT_KEY;

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
                'https://client.vivreal.io/tenant/createCheckoutSession',
                {
                    products: products,
                    stripeKey: integrationInfo.stripe.secretKey,
                    businessName: businessInfo.name,
                    contactEmail: businessInfo.contactInfo.email,
                    requiresShipping: businessInfo.shipping
                },
                {
                    headers: {
                        Authorization: key,
                        "Content-Type": "application/json",
                    },
                }
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
                        src={getSafeFieldValue("productImage")?.currentFile?.source || siteLogo}
                        alt={getSafeFieldValue("name")}
                        sx={{ width: 60, height: 60, borderRadius: "8px" }}
                        />
                        <Box>
                        <Typography fontWeight="bold">
                            {getSafeFieldValue("name")}
                        </Typography>
                        <Typography fontSize="0.875rem" sx={{ color: 'var(--color-text-secondary)'}}>
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