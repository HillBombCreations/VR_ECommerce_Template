/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import LoadingPage from "../../loadingPage/index.jsx";
import ProductsContext from "../../../context/productsContext.jsx";
import CartContext from "../../../context/cartContext.jsx";
import FloatingCartDialog from "./floatingCartDialog.jsx";
import axios from 'axios';

// Wrappers
import Header from "../../../components/wrappers/header/index.jsx";
import Footer from "../../../components/wrappers/footer/index.jsx";
// import NoShippingBanner from "../../../components/universal/noShippingBanner/index.jsx";

// MUI Imports
import { ArrowBack } from "@mui/icons-material";
import {
    Box, Typography,
    Button, Select, MenuItem,
    FormControl, IconButton, CircularProgress
} from "@mui/material";
import { styled } from "@mui/material/styles";

import "../../../App.css";

const PageContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: theme.spacing(2),
    background: "var(--color-surface)",
    flexGrow: 1,
    width: "90%",
    padding: theme.spacing(2),
    paddingTop: '10vh'
}));

const ProductContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: theme.spacing(2),
    width: "90%"
}));

const ProductImage = styled("img")(() => ({
    width: "100%",
    height: "250px",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px var(--shadow-medium)",
    objectFit: "contain",
    backgroundColor: "var(--color-surface-alt)",
}));

const ProductDetails = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    gap: theme.spacing(2),
    width: "100%",
    padding: theme.spacing(1),
}));

const ButtonGroup = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    width: "90%",
    gap: theme.spacing(2),
    marginBottom: '20px',
}));

const ProductPage = () => {
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_API_URL;
    const key = import.meta.env.VITE_CLIENT_KEY;
    const stripeKey = import.meta.env.VITE_STRIPE_KEY;
    const { cartItems, setCartItems } = useContext(CartContext);
    const { products } = useContext(ProductsContext);
    const [loadingProduct, setLoadingProduct] = useState(true);
    const [loadingCheckout, setLoadingCheckout] = useState(false);
    const [cartDialogOpen, setCartDialogOpen] = useState(false);
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [selectedVariant, setSelectedVariant] = useState(null);

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
                imageSrc: getSafeFieldValue("productImage")?.currentFile?.source,
                variant
            };
        }

        setCartItems(tempCartItems);
        setCartDialogOpen(true);
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
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", width: "100vw" }}>
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
                {loadingProduct ? (
                    <LoadingPage />
                ) : product ? (
                    <>
                        <ProductContainer>
                            <IconButton
                                onClick={() => navigate("/products")}
                                sx={{
                                    color: "var(--color-primary)",
                                    textTransform: "none",
                                    fontSize: "1rem",
                                    display: "flex",
                                    alignItems: "center",
                                    '&:hover': {
                                        textDecoration: "underline",
                                        backgroundColor: "transparent"
                                    }
                                }}
                            >
                                <ArrowBack sx={{ marginRight: 1 }} />
                            </IconButton>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
                                <Box
                                    sx={{
                                        backgroundColor: 'var(--color-surface-alt)',
                                        borderTop: '1px solid var(--color-primary)',
                                        width: '100%',
                                        borderBottom: '1px solid var(--color-primary)',
                                        color: 'var(--color-text-primary)',
                                        padding: '10px 16px',
                                        textAlign: 'center',
                                        fontWeight: 500,
                                        fontSize: '0.95rem',
                                        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                                        zIndex: 1,
                                    }}
                                >
                                ⚠️ <strong>Pickup only:</strong> We're currently not offering shipping.
                                </Box>
                            </div>
                            <Typography variant="h5" sx={{ fontWeight: "bold" }}>{getSafeFieldValue("name")}</Typography>
                            <ProductImage
                                component="img"
                                src={getSafeFieldValue("productImage")?.currentFile?.source || '/siteAssets/placeHolder.png'}
                                alt={getSafeFieldValue("name")}
                            />
                            <ProductDetails>
                                <Typography variant="h4" sx={{ fontWeight: "bold", color: "var(--color-primary)" }}>
                                    ${getSafeFieldValue("price")}
                                </Typography>
                                <Typography variant="body2" sx={{ marginBottom: 2 }}>{getSafeFieldValue("description")}</Typography>
                                {product?.usingVariant?.values?.length > 0 && (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
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
                                                        color: isSelected ? "var(--color-surface)" : "var(--color-primary)",
                                                        fontWeight: isSelected ? 600 : 500,
                                                        border: isSelected ? "none" : "1px solid var(--color-primary)",
                                                        outline: "none",
                                                        boxShadow: "none",
                                                        WebkitTapHighlightColor: "transparent",
                                                        '&:focus': {
                                                          outline: "none",
                                                          boxShadow: "none",
                                                        }
                                                    }}
                                                >
                                                    {variant}
                                                </Button>
                                            );
                                        })}
                                    </Box>
                                )}
                                <FormControl sx={{ width: '100%' }}>
                                    <Select
                                        value={quantity}
                                        onChange={(e) => setQuantity(e.target.value)}
                                        displayEmpty
                                        renderValue={(selected) => `Quantity: ${selected}`}
                                        sx={{
                                            backgroundColor: "var(--color-surface-alt)",
                                            borderRadius: "8px",
                                            padding: "4px 8px",
                                            boxShadow: "none",
                                            "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                                        }}
                                    >
                                        {[1, 2, 3, 4, 5].map((num) => (
                                            <MenuItem key={num} value={num}>{num}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </ProductDetails>
                        </ProductContainer>
                        <ButtonGroup>
                            <Button
                                variant="contained"
                                disabled={loadingCheckout}
                                sx={{
                                    backgroundColor: "var(--color-primary)",
                                    color: "white",
                                    width: "100%",
                                    padding: "12px",
                                    borderRadius: "20px",
                                    fontSize: "1rem",
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
                                    padding: "12px",
                                    borderRadius: "20px",
                                    fontSize: "1rem",
                                }}
                                onClick={handleCheckout}
                            >
                                {loadingCheckout ? <CircularProgress size={20} sx={{ color: "var(--color-primary)" }} /> : 'Buy Now'}
                            </Button>
                        </ButtonGroup>
                    </>
                ) : (
                    <Typography variant="h6" color="error">Product not found.</Typography>
                )}
            </PageContainer>
            <Footer sx={{ marginTop: "auto" }} />
        </Box>
    );
};

ProductPage.propTypes = {
    xmlToJSON: PropTypes.any,
};

export default ProductPage;