/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import LoadingPage from "../../loadingPage/index.jsx";
import ProductsContext from "../../../context/productsContext.jsx";
import CartContext from "../../../context/cartContext.jsx";
import axios from 'axios';
import FloatingCartDialog from './floatingCartDialog.jsx';
import FetchedDataContext from "../../../context/fetchedDataContext.jsx";
// import NoShippingBanner from "../../../components/universal/noShippingBanner/index.jsx";


// Wrappers
import Header from "../../../components/wrappers/header/index.jsx";
import Footer from "../../../components/wrappers/footer/index.jsx";

// Components
import CookiePopup from "../../../components/universal/cookiePopup.jsx";

// MUI Imports
import { ArrowBack } from "@mui/icons-material";
import { Box, Typography, Button, Select, MenuItem, FormControl, IconButton, CircularProgress } from "@mui/material";
import { styled } from "@mui/material/styles";

// CSS
import "../../../App.css";

const PageContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: theme.spacing(4),
    background: "var(--color-surface)",
    overflow: "hidden",
    scrollBehavior: "smooth",
    width: "100%",
    padding: theme.spacing(4),
    flexGrow: 1,
    marginTop: theme.spacing(8),
}));

const ProductContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: theme.spacing(5),
    width: "100%",
    maxWidth: "1200px",
    margin: "auto",
    flexWrap: "wrap",
    minHeight: "calc(100vh - 160px)",
}));

const ProductImageWrapper = styled(Box)(() => ({
    width: "500px",
    height: "400px",
    borderRadius: "var(--radius-base)",
    boxShadow: "var(--shadow-medium)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "var(--color-surface-alt)",
    overflow: "hidden",
}));

const ProductDetails = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
    flex: "1 1 350px",
    padding: theme.spacing(3),
    border: "2px solid var(--color-primary)",
    borderRadius: "var(--radius-base)",
    minWidth: "320px",
}));

const ButtonGroup = styled(Box)(({ theme }) => ({
    display: "flex",
    marginTop: "3vh",
    flexDirection: "column",
    gap: theme.spacing(2),
    width: "100%",
}));

const ProductPage = () => {
    const navigate = useNavigate();
    const { siteLogo } = useContext(FetchedDataContext)
    const { cartItems, setCartItems } = useContext(CartContext);
    const API_URL = import.meta.env.VITE_API_URL;
    const key = import.meta.env.VITE_CLIENT_KEY;
    const stripeKey = import.meta.env.VITE_STRIPE_KEY;

    const { products } = useContext(ProductsContext);
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [acceptedCookieBool, setAcceptedCookieBool] = useState(Cookies.get("acceptedcookie"));
    const [loadingProduct, setLoadingProduct] = useState(true);
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [loadingCheckout, setLoadingCheckout] = useState(false);
    const [cartDialogOpen, setCartDialogOpen] = useState(false);

    useEffect(() => {
        setLoadingProduct(true);
        const currentUrl = window.location.pathname;
        const slug = currentUrl.split("/").filter(Boolean).pop();
        const foundProduct = products.find((prod) => slug === prod.id);
        setProduct(foundProduct || null);

        if (foundProduct?.usingVariant?.values?.length) {
            setSelectedVariant(foundProduct.usingVariant.values[0]);
        }
        setLoadingProduct(false);
    }, [products]);

    const handleAddToCart = () => {
        const variant = selectedVariant || product.usingVariant?.values?.[0];
        const cartKey = `${product.id}_${variant}`;
        let tempCartItems = { ...cartItems };
      
        if (tempCartItems[cartKey]) {
          tempCartItems[cartKey].quantity += quantity;
        } else {
          tempCartItems[cartKey] = {
            quantity,
           name: selectedVariant
            ? `${getSafeFieldValue("name")} (${selectedVariant})`
            : getSafeFieldValue("name"),
            price: getSafeFieldValue("price"),
            priceID: product.default_price,
            imageSrc: getSafeFieldValue("productImage")?.currentFile?.source || siteLogo,
            variant,
          };
        }
      
        setCartItems(tempCartItems);
        setCartDialogOpen(true);
    };
    
    const acceptCookies = () => {
        setAcceptedCookieBool(1);
        Cookies.set("acceptedcookie", 1);
    };

    const handleCheckout = async () => {
        setLoadingCheckout(true);
        const products = [{ price: product.default_price, quantity: quantity }];
        const { data } = await axios.post(
            `${API_URL}/tenant/createCheckoutSession`,
            {
                products: products,
                stripeKey: stripeKey
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

    const getSafeFieldValue = (key) => {
        if (
          typeof product?.[key] === 'object' &&
          product?.usingVariant?.values?.includes(selectedVariant)
        ) {
          return product[key][selectedVariant];
        }
        return product?.[key];
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
                width: "100vw",
                overflowX: "hidden",
                backgroundColor: "#fff",
            }}
        >
            <FloatingCartDialog
                open={cartDialogOpen}
                quantity={quantity}
                onClose={() => setCartDialogOpen(false)}
                product={product}
                variant={selectedVariant}
                cartCount={Object.keys(cartItems).reduce((total, key) => total + cartItems[key].quantity, 0)}
            />
            {/* <NoShippingBanner /> */}
            <Header />
            <PageContainer>
                <IconButton
                    onClick={() => navigate("/products")}
                    sx={{
                        alignSelf: "flex-start",
                        color: "var(--color-primary)",
                        textTransform: "none",
                        fontSize: "1rem",
                        display: "flex",
                        alignItems: "center",
                        transition: "var(--transition-base)",
                        "&:hover": {
                        textDecoration: "underline",
                        backgroundColor: "transparent",
                        },
                    }}
                >
                    <ArrowBack sx={{ marginRight: 1 }} /> Back to All Products
                </IconButton>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
                    <Box
                        sx={{
                            backgroundColor: "var(--color-surface-alt)",
                            borderTop: "1px solid var(--color-primary)",
                            width: "100%",
                            borderBottom: "1px solid var(--color-primary)",
                            color: "var(--color-text-primary)",
                            padding: "10px 16px",
                            textAlign: "center",
                            fontWeight: 500,
                            fontSize: "0.95rem",
                            boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                            zIndex: 1,
                        }}
                    >
                    ⚠️ <strong>Pickup only:</strong> We're currently not offering shipping.
                    </Box>
                </div>
                {loadingProduct ? (
                    <LoadingPage />
                ) : product ? (
                    <ProductContainer>
                        <ProductImageWrapper>
                            <img
                                src={getSafeFieldValue("productImage")?.currentFile?.source || siteLogo}
                                alt={getSafeFieldValue("name")}
                                style={{
                                maxWidth: "100%",
                                maxHeight: "100%",
                                objectFit: "contain",
                                }}
                            />
                        </ProductImageWrapper>
                        <ProductDetails>
                            {/* Product Name & Price */}
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: "1.5rem" }}>
                                    {getSafeFieldValue("name")}
                                </Typography>
                                <Typography variant="h6" sx={{ color: "var(--color-primary)", fontWeight: "bold", fontSize: "1.5rem" }}>
                                    ${getSafeFieldValue("price")}
                                </Typography>
                            </Box>
                            <Typography variant="body1" sx={{ marginBottom: 2 }}>
                                {getSafeFieldValue("description")}
                            </Typography>
                            {product?.usingVariant?.values?.length > 0 && (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                    {product.usingVariant.values.map((variant) => {
                                    const isSelected = selectedVariant === variant;
                                    return (
                                        <Button
                                        key={variant}
                                        variant={isSelected ? "contained" : "outlined"}
                                        size="small"
                                        onClick={() => setSelectedVariant(variant)}
                                        sx={{
                                            fontSize: "12px",
                                            px: 1.5,
                                            borderRadius: "12px",
                                            textTransform: "none",
                                            backgroundColor: isSelected ? "var(--color-primary)" : "transparent",
                                            color: isSelected ? "#fff" : "var(--color-primary)",
                                            border: isSelected ? "2px solid #365b99" : "1px solid var(--color-primary)",
                                            fontWeight: isSelected ? 600 : 500,
                                            '&:hover': {
                                                backgroundColor: "var(--color-light-hover)",
                                            },
                                        }}
                                        >
                                        {variant}
                                        </Button>
                                    );
                                    })}
                                </Box>
                            )}
                            <FormControl sx={{ width: '100%', mt: 2 }}>
                                <Select
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                    displayEmpty
                                    renderValue={(selected) => `Quantity: ${selected}`}
                                    sx={{
                                    backgroundColor: "var(--color-surface-alt)",
                                    borderRadius: "8px",
                                    "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                                    }}
                                >
                                    {[1, 2, 3, 4, 5].map((num) => (
                                    <MenuItem key={num} value={num}>
                                        {num}
                                    </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <ButtonGroup>
                                <Button
                                    variant="contained"
                                    disabled={loadingCheckout}
                                    sx={{
                                    backgroundColor: "var(--color-primary)",
                                    color: "white",
                                    width: "100%",
                                    borderRadius: "25px",
                                    fontSize: "1.2rem",
                                    }}
                                    onClick={handleAddToCart}
                                >
                                    Add to Cart
                                </Button>
                                <Button
                                    variant="outlined"
                                    disabled={loadingCheckout}
                                    sx={{
                                    borderColor: "var(--color-primary)",
                                    color: "var(--color-primary)",
                                    width: "100%",
                                    borderRadius: "25px",
                                    fontSize: "1.2rem",
                                    '&:hover': {
                                        backgroundColor: "var(--color-light-hover)",
                                        borderColor: "var(--color-secondary)",
                                        color: "var(--color-secondary)",
                                    },
                                    }}
                                    onClick={handleCheckout}
                                >
                                    {loadingCheckout ? (
                                    <CircularProgress size={20} sx={{ color: "var(--color-primary)" }} />
                                    ) : (
                                    "Buy Now"
                                    )}
                                </Button>
                            </ButtonGroup>
                        </ProductDetails>
                    </ProductContainer>
                ) : (
                    <Typography variant="h6" color="error">Product not found.</Typography>
                )}
            </PageContainer>
            {!acceptedCookieBool ? <CookiePopup acceptCookies={acceptCookies} /> : null}
            <Footer sx={{ mt: "auto" }} />
            {!acceptedCookieBool ? <CookiePopup acceptCookies={acceptCookies} /> : null}
        </Box>
    );
};

ProductPage.propTypes = {
    xmlToJSON: PropTypes.any,
};

export default ProductPage;