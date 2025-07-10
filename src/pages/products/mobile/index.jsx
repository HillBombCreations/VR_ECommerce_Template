/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect, useContext, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import LoadingPage from "../../loadingPage/index.jsx";
import ProductsContext from "../../../context/productsContext.jsx";
import CartContext from "../../../context/cartContext.jsx";

// Wrappers
import Header from "../../../components/wrappers/header/index.jsx";
import Footer from "../../../components/wrappers/footer/index.jsx";

// Components
import CookiePopup from "../../../components/pages/landing/cookiePopup/index.jsx";
// import NoShippingBanner from "../../../components/universal/noShippingBanner/index.jsx";
import AddedToCartSnackBar from "./AddedToCartSnackBar.jsx";

// MUI Imports
import {
  Box, Typography, Card, CardContent, CardMedia, Button, IconButton, Badge,
  CircularProgress, Radio, RadioGroup, Drawer, FormControlLabel
} from "@mui/material";
import { ShoppingCart, Cancel, FilterList } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

import "../../../App.css";

const PageContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: theme.spacing(2),
  flexGrow: 1,
  overflowX: "hidden",
  width: "90%",
  backgroundColor: "#fff",
  padding: theme.spacing(2),
}));

const HeaderContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  flexDirection: 'column',
  width: "100%",
  marginTop: theme.spacing(8),
  paddingBottom: theme.spacing(2),
  borderBottom: "2px solid #5d8842",
}));

const ProductsGrid = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: theme.spacing(2),
  width: "100%",
}));

const ProductCard = styled(Card)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
}));

const ProductsPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { cartItems, setCartItems } = useContext(CartContext);
    const { setProducts } = useContext(ProductsContext);
    const [products, setLocalProducts] = useState([]);
    const [selectedVariants, setSelectedVariants] = useState({});
    const [acceptedCookieBool, setAcceptedCookieBool] = useState(Cookies.get("acceptedcookie"));
    const [loadingProducts, setLoadingProducts] = useState(true);
    const [itemAdded, setItemAdded] = useState(false);
    const [loadingFilteredProducts, setLoadingFilteredProducts] = useState(false);
    const [filterType, setFilterType] = useState("");
    const [drawerOpen, setDrawerOpen] = useState(false);
    const API_URL = import.meta.env.VITE_API_URL;
    const key = import.meta.env.VITE_CLIENT_KEY;
    const hasMounted = useRef(false);

    const types = [
        { label: 'Hummus', value: "hummus" },
        { label: 'Bread', value: "bread" }
    ];

    const getProductsCall = async (groupBy = {}) => {
        const { data } = await axios.get(`${API_URL}/tenant/integrationObjects`, {
            params: { type: "stripe", groupBy },
            headers: { Authorization: key, "Content-Type": "application/json" },
        });

        const mapped = data.map((obj) => {
            const defaultVariant = obj.usingVariant?.values?.[0] || null;
            return {
            ...obj.objectValue,
            id: obj.id,
            usingVariant: obj.usingVariant,
            selectedVariant: defaultVariant,
            };
        });

        const variantDefaults = {};
        mapped.forEach(p => {
            if (p.usingVariant?.values?.length) variantDefaults[p.id] = p.usingVariant.values[0];
        });
        setSelectedVariants(variantDefaults);
        setLocalProducts(mapped);
        setProducts(mapped);
        setLoadingProducts(false);
    };

    const resolveField = (field, product, selectedVariant) => {
    if (typeof product[field] === 'object' && selectedVariant && product[field]?.[selectedVariant]) {
        return product[field][selectedVariant];
    }
    return product[field];
    };

    const handleAddToCart = (product) => {
        const selectedVariant = selectedVariants[product.id] || product.usingVariant?.values?.[0];
        const cartKey = `${product.id}_${selectedVariant}`;
        const tempCartItems = { ...cartItems };

        if (tempCartItems[cartKey]) {
            tempCartItems[cartKey].quantity += 1;
        } else {
            tempCartItems[cartKey] = {
                quantity: 1,
                name: selectedVariant
                    ? `${resolveField("name", product, selectedVariant)} (${selectedVariant})`
                    : resolveField("name", product),
                price: resolveField("price", product, selectedVariant),
                priceID: resolveField("default_price", product, selectedVariant),
                imageSrc: resolveField("productImage", product, selectedVariant)?.currentFile?.source || '/siteAssets/placeHolder.png',
                variant: selectedVariant
            };
        }

        setItemAdded(true);
        setCartItems(tempCartItems);
    };

    const handleSetFilterType = async (value) => {
        setFilterType(value);
        setLoadingFilteredProducts(true);
        if (value) await getProductsCall({ key: 'food type', value });
        else await getProductsCall();
        setLoadingFilteredProducts(false);
        setDrawerOpen(false);
    };

    useEffect(() => {
        if (!hasMounted.current) {
            hasMounted.current = true;
            const filter = new URLSearchParams(location.search).get("filter");
            if (filter) handleSetFilterType(filter);
            else getProductsCall();
        }
    }, []);

    const truncate = (txt) => txt.length > 50 ? txt.substring(0, 50) + "..." : txt;

    return (
    <>
        <AddedToCartSnackBar itemAdded={itemAdded} setItemAdded={setItemAdded} />
        {loadingProducts ? <LoadingPage /> : (
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", width: "100vw" }}>
            {/* <NoShippingBanner /> */}
            <Header />
            <PageContainer>
                <HeaderContainer>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                        <Box
                            sx={{
                                backgroundColor: '#fffde7',
                                borderTop: '1px solid #fdd835',
                                width: '100%',
                                borderBottom: '1px solid #fdd835',
                                color: '#795548',
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
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px'}}>
                        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#5d8842" }}>Our Products</Typography>
                        <Badge badgeContent={filterType ? 1 : 0} color="error">
                            <IconButton onClick={() => setDrawerOpen(true)}>
                                <FilterList sx={{ color: "#5d8842" }} />
                            </IconButton>
                        </Badge>
                    </div>
                </HeaderContainer>

                <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <Box sx={{ width: 250, padding: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h6" sx={{ color: '#5d8842', fontWeight: 'bold' }}>Types</Typography>
                    {filterType && <IconButton onClick={() => handleSetFilterType('')}><Cancel sx={{ color: '#5d8842' }} /></IconButton>}
                    </Box>
                    <RadioGroup value={filterType} onChange={(e) => handleSetFilterType(e.target.value)}>
                    {types.map(type => (
                        <FormControlLabel key={type.value} value={type.value} control={<Radio sx={{ color: '#5d8842', '&.Mui-checked': { color: '#5d8842' } }} />} label={type.label} />
                    ))}
                    </RadioGroup>
                </Box>
                </Drawer>

                {loadingFilteredProducts ? <CircularProgress sx={{ color: "#5d8842" }} /> : (
                <ProductsGrid>
                    {products.map(product => (
                    <ProductCard key={product.id} onClick={() => navigate(`/product/${product.id}`)}>
                        <CardMedia component="img" sx={{ maxHeight: 180, objectFit: "contain" }} image={resolveField("productImage", product, selectedVariants[product.id])?.currentFile?.source || '/siteAssets/placeHolder.png'} alt={resolveField("name", product, selectedVariants[product.id])} />
                        <CardContent sx={{ width: '100%' }}>
                        {Array.isArray(product.usingVariant?.values) && (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', ml: 1, gap: 1, mb: 1 }}>
                            {product.usingVariant.values.map((variant, idx) => {
                                const isSelected = selectedVariants[product.id] === variant;
                                return (
                                    <Button
                                        key={idx}
                                        variant={isSelected ? 'contained' : 'outlined'}
                                        size="small"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedVariants(prev => ({ ...prev, [product.id]: variant }));
                                        }}
                                        sx={{
                                            fontSize: "12px",
                                            px: 1.5,
                                            borderRadius: "12px",
                                            textTransform: "none",
                                            backgroundColor: isSelected ? "#5d8842" : "transparent",
                                            color: isSelected ? "#fff" : "#5d8842",
                                            fontWeight: isSelected ? 600 : 500,
                                            border: isSelected ? "none" : "1px solid #5d8842",
                                            outline: "none",
                                            boxShadow: "none",
                                            WebkitTapHighlightColor: "transparent",
                                            '&:hover': {
                                            backgroundColor: isSelected ? "#4a7336" : "#e0f2e0",
                                            border: isSelected ? "none" : "1px solid #365b99",
                                            },
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
                        <Typography variant="h6" sx={{ fontWeight: "bold", ml: 1 }}>{resolveField("name", product, selectedVariants[product.id])}</Typography>
                        <Typography variant="body2" sx={{ ml: 1 }} color="textSecondary">{truncate(resolveField("description", product, selectedVariants[product.id]))}</Typography>
                        <Typography variant="h6" sx={{ color: "#5d8842", fontWeight: "bold", ml: 1 }}>${resolveField("price", product, selectedVariants[product.id])}</Typography>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                            <Button
                                variant="contained"
                                fullWidth
                                sx={{ mt: 1, width: '90%', backgroundColor: "#5d8842", '&:hover': { backgroundColor: "#4a7336" } }}
                                onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }}
                                startIcon={<ShoppingCart />}
                            >Add to Cart</Button>
                        </div>
                        </CardContent>
                    </ProductCard>
                    ))}
                </ProductsGrid>
                )}
            </PageContainer>
            <Footer />
            {!acceptedCookieBool && <CookiePopup acceptCookies={() => { setAcceptedCookieBool(1); Cookies.set("acceptedcookie", 1); }} />}
        </Box>
        )}
    </>
    );
};

export default ProductsPage;
