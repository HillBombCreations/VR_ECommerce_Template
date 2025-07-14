import { useState, useEffect, useContext, useRef } from "react";
/* eslint-disable react/no-unescaped-entities */
import OverflowToolTip from "../../../components/wrappers/overflowTooltip.jsx";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import LoadingPage from "../../loadingPage/index.jsx";
import ProductsContext from "../../../context/productsContext.jsx";
import ErrorLoadingProducts from "./errorLoadingProducts.jsx";
// Wrappers
import Header from "../../../components/wrappers/header/index.jsx";
import Footer from "../../../components/wrappers/footer/index.jsx";
import AddedToCartSnackBar from "./AddedToCartSnackBar.jsx";
// Components
import CookiePopup from "../../../components/universal/cookiePopup.jsx";

// MUI Imports
import {
    Box, Typography, Card, CardContent,
    Button, FormControlLabel, CircularProgress,
    Radio, RadioGroup
} from "@mui/material";
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { ShoppingCart, Cancel } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
// import NoShippingBanner from "../../../components/universal/noShippingBanner/index.jsx";

// CSS
import CartContext from "../../../context/cartContext.jsx";

const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }}/>
     ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.white,
      color: 'rgba(0, 0, 0, 0.87)',
      fontSize: 12,
    },
}));

const PageContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: theme.spacing(4),
    flexGrow: 1,
    overflowY: "auto",
    overflowX: "hidden",
    scrollBehavior: "smooth",
    boxSizing: "border-box",
    width: "100%",
    height: '80vh',
    backgroundColor: "var(--color-surface)",
    padding: theme.spacing(4),
    marginTop: theme.spacing(8),
}));

const HeaderContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: 'column',
    width: "80%",
    paddingBottom: theme.spacing(2),
    borderBottom: "2px solid var(--color-primary)",
    gap: theme.spacing(2),
}));

const Sidebar = styled(Box)(({ theme }) => ({
    width: "10%",
    padding: theme.spacing(2),
    borderRight: "2px solid var(--color-primary)",
    overflowY: "auto",
    maxHeight: "60vh",
}));

const ContentContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    width: "80%",
    height: '100%',
    overflowY: 'hidden',
    gap: theme.spacing(4),
}));

const ProductsGrid = styled(Box)(({ theme }) => ({
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
    gap: theme.spacing(4),
    width: '100%',
    overflowY: "auto",
    overflowX: "hidden",
    maxHeight: "60vh",
    paddingRight: theme.spacing(1),
}));

const ProductCard = styled(Card)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "var(--color-surface)",
    justifyContent: "flex-start",
    width: "100%",
    maxWidth: 300,
    height: 340,
    padding: theme.spacing(2),
    cursor: "pointer",
    boxShadow: "var(--shadow-medium)",
    borderRadius: "var(--radius-base)",
    border: "1px solid transparent",
}));
  

const ProductsPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { cartItems, setCartItems } = useContext(CartContext);
    const { setProducts } = useContext(ProductsContext);
    const [selectedVariants, setSelectedVariants] = useState({});
    const [errorLoadingProducts, setErrrorLoadingProducts] = useState(false);
    const [acceptedCookieBool, setAcceptedCookieBool] = useState(Cookies.get('acceptedcookie'));
    const [itemAdded, setItemAdded] = useState(false);
    const [loadingProducts, setLoadingProducts] = useState(true);
    const [products, setLocalProducts] = useState([]);
    const [loadingFilteredProducts, setLoadingFilteredProducts] = useState(false);
    const [filterType, setFilterType] = useState("");
    // const [searchQuery, setSearchQuery] = useState("");

    // UPDATE dynamically set types
    const types = [
        { label: 'Hummus', value: "hummus" },
        { label: 'Bread', value: "bread" }
    ];

    const API_URL = import.meta.env.VITE_API_URL;
    const key = import.meta.env.VITE_CLIENT_KEY;
    const hasMounted = useRef(false);

    const acceptCookies = () => {
        setAcceptedCookieBool(1);
        Cookies.set('acceptedcookie', 1);
    };

    const getProductsCall = async (groupBy = {}) => {
        try {
            const { data } = await axios.get(`${API_URL}/tenant/integrationObjects`, {
                params: { type: "stripe", groupBy },
                headers: {
                    Authorization: key,
                    "Content-Type": "application/json",
                },
            });
            const mappedProducts = data.map((obj) => {
                const defaultVariant = obj.usingVariant?.values?.[0] || null;
                return {
                    ...obj.objectValue,
                    id: obj.id,
                    usingVariant: obj.usingVariant,
                    selectedVariant: defaultVariant,
                };
            });
            
            const variantDefaults = {};
            mappedProducts.forEach((p) => {
            if (p.usingVariant?.values?.length)
                variantDefaults[p.id] = p.usingVariant.values[0];
            });
            setSelectedVariants(variantDefaults);
            setLocalProducts(mappedProducts);
            setProducts(mappedProducts);
        } catch (err) {
            setErrrorLoadingProducts(true);
        } finally {
            setLoadingProducts(false);
        }
    };

    const handleSetFilterType = async (value) => {
        setFilterType(value);
        setLoadingFilteredProducts(true);
        if (value) {
            await getProductsCall({ key: 'food type', value });
        } else {
            await getProductsCall();
        }
        setLoadingFilteredProducts(false);
    };
    
    const handleClearFilter = async () => {
        setFilterType("");
        setLoadingFilteredProducts(true);
        await getProductsCall();
        setLoadingFilteredProducts(false);
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

    useEffect(() => {
        if (!hasMounted.current) {
            hasMounted.current = true;
            const searchParams = new URLSearchParams(location.search);
            const filter = searchParams.get("filter");

            if (filter) {
                handleSetFilterType(filter);
            } else getProductsCall();
        }
    }, []);

    const getSafeFieldValue = (obj, key) => {
        const selected = selectedVariants?.[obj.id];
      
        if (!obj?.usingVariant?.name || !selected) return obj[key];
      
        if (
          typeof obj[key] === 'object' &&
          obj[key] !== null &&
          Array.isArray(obj.usingVariant?.values) &&
          obj.usingVariant.values.some((val) => Object.keys(obj[key] || {}).includes(val))
        ) {
          return obj[key][selected];
        }
      
        return obj[key];
    };
  return (
    <>
        <AddedToCartSnackBar itemAdded={itemAdded} setItemAdded={setItemAdded} />
        {loadingProducts ? (
            <LoadingPage />
        ) : errorLoadingProducts ? (
            <ErrorLoadingProducts />
        ) : (
            <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
                width: "100vw",
                overflowX: "hidden",
            }}
            >
            <Header />
            <PageContainer>
                <HeaderContainer>
                <div
                    style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    }}
                >
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
                    ⚠️ <strong>Pickup only:</strong> We're currently not offering
                    shipping.
                    </Box>
                </div>
                <div
                    style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "start",
                    alignItems: "center",
                    }}
                >
                    <Typography
                    variant="h5"
                    sx={{ fontWeight: "bold", color: "var(--color-primary)" }}
                    >
                    Our Products
                    </Typography>
                </div>
                </HeaderContainer>
                <ContentContainer>
                <Sidebar>
                    <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                    >
                    <Typography
                        variant="h6"
                        sx={{ fontWeight: "bold", color: "var(--color-primary)" }}
                    >
                        Types
                    </Typography>
                    {filterType && (
                        <LightTooltip
                        placement="right"
                        className="tooltip"
                        arrow
                        title={
                            <span style={{ fontSize: "10pt", fontWeight: "bold" }}>
                            Clear Filter
                            </span>
                        }
                        >
                        <Cancel
                            onClick={handleClearFilter}
                            sx={{
                            color: "var(--color-primary)",
                            cursor: "pointer",
                            }}
                        />
                        </LightTooltip>
                    )}
                    </Box>
                    <RadioGroup
                    value={filterType}
                    onChange={(e) => handleSetFilterType(e.target.value)}
                    >
                    {types.map((type) => (
                        <FormControlLabel
                        key={type.value}
                        value={type.value}
                        control={
                            <Radio
                            sx={{
                                color: "var(--color-primary)",
                                "&.Mui-checked": {
                                color: "var(--color-primary)",
                                },
                            }}
                            />
                        }
                        label={type.label}
                        />
                    ))}
                    </RadioGroup>
                </Sidebar>
                {loadingFilteredProducts ? (
                    <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        height: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                    >
                    <CircularProgress sx={{ color: "var(--color-primary)" }} />
                    </div>
                ) : (
                    <ProductsGrid>
                    {products.map((product) => (
                        <ProductCard
                        key={product.id}
                        onClick={() => navigate(`/product/${product.id}`)}
                        >
                        <Box
                            sx={{
                            width: "100%",
                            height: 150,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "var(--color-surface-alt)",
                            borderBottom: "1px solid #ddd",
                            }}
                        >
                            <img
                            src={
                                getSafeFieldValue(product, "productImage")?.currentFile
                                ?.source || "/siteAssets/placeHolder.png"
                            }
                            alt={getSafeFieldValue(product, "name")}
                            style={{
                                maxHeight: "100%",
                                maxWidth: "100%",
                                objectFit: "contain",
                            }}
                            />
                        </Box>
                        <CardContent
                            sx={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            padding: 0,
                            pt: 2,
                            boxSizing: "border-box",
                            flexGrow: 1,
                            }}
                        >
                            <Box
                            sx={{
                                minHeight: 32,
                                display: "flex",
                                flexWrap: "wrap",
                                justifyContent: "center",
                                gap: 0.5,
                                mb: 1,
                            }}
                            >
                            {Array.isArray(product.usingVariant?.values) &&
                                product.usingVariant.values.map((variant, idx) => {
                                const isSelected =
                                    selectedVariants[product.id] === variant;
                                return (
                                    <Button
                                    key={idx}
                                    variant={isSelected ? "contained" : "outlined"}
                                    size="small"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedVariants((prev) => ({
                                        ...prev,
                                        [product.id]: variant,
                                        }));
                                    }}
                                    sx={{
                                        fontSize: "11px",
                                        minWidth: "20px",
                                        px: 0.5,
                                        height: 24,
                                        borderRadius: "12px",
                                        textTransform: "none",
                                        backgroundColor: isSelected
                                        ? "var(--color-primary)"
                                        : "transparent",
                                        color: isSelected
                                        ? "var(--color-text-inverse)"
                                        : "var(--color-primary)",
                                        border: isSelected
                                        ? "2px solid var(--color-primary-hover)"
                                        : "1px solid var(--color-primary)",
                                        fontWeight: isSelected ? 600 : 500,
                                        transition: "var(--transition-base)",
                                        "&:hover": {
                                        backgroundColor: isSelected
                                            ? "var(--color-primary-hover)"
                                            : "#e0f2e0",
                                        },
                                    }}
                                    >
                                    {variant}
                                    </Button>
                                );
                                })}
                            </Box>
                            <Box sx={{ width: "100%", maxWidth: "200px" }}>
                            <Typography
                                variant="h6"
                                component="span"
                                sx={{
                                fontWeight: "bold",
                                textAlign: "center",
                                mb: 0.5,
                                color: "var(--color-text-primary)",
                                }}
                            >
                                <OverflowToolTip
                                string={getSafeFieldValue(product, "name")}
                                />
                            </Typography>
                            </Box>
                            <Box sx={{ width: "100%", maxWidth: "200px" }}>
                            <Typography
                                variant="body2"
                                component="span"
                                sx={{
                                textAlign: "center",
                                mb: 1,
                                color: "var(--color-text-secondary)",
                                }}
                            >
                                <OverflowToolTip
                                string={getSafeFieldValue(product, "description")}
                                />
                            </Typography>
                            </Box>
                            <Typography
                            variant="h6"
                            component="span"
                            sx={{
                                fontWeight: "bold",
                                color: "var(--color-primary)",
                                mb: 1,
                            }}
                            >
                            ${getSafeFieldValue(product, "price")}
                            </Typography>
                            <Box sx={{ flexGrow: 1 }} />
                            <Button
                            variant="contained"
                            size="small"
                            sx={{
                                borderRadius: "25px",
                                backgroundColor: "var(--color-primary)",
                                color: "var(--color-text-inverse)",
                                "&:hover": {
                                backgroundColor: "var(--color-primary-hover)",
                                },
                            }}
                            startIcon={<ShoppingCart />}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleAddToCart(product);
                            }}
                            >
                            Add to Cart
                            </Button>
                        </CardContent>
                        </ProductCard>
                    ))}
                    </ProductsGrid>
                )}
                </ContentContainer>
            </PageContainer>
            <Footer />
            {!acceptedCookieBool && <CookiePopup acceptCookies={acceptCookies} />}
            </Box>
        )}
    </>
  );
};

export default ProductsPage;
