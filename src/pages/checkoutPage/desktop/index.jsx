/* eslint-disable react/no-unescaped-entities */
import { Box, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { CheckCircleOutline } from '@mui/icons-material';
import CartContext from '../../../context/cartContext.jsx';
// Wrappers
import Header from "../../../components/wrappers/header/index.jsx";
import Footer from "../../../components/wrappers/footer/index.jsx";
import axios from 'axios';
import { useEffect, useContext, useRef } from 'react';

const PageContainer = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: '#f3efd2',
}));

const ContentContainer = styled(Box)(({ theme }) => ({
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
}));

const MessageContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    marginTop: '10vh',
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spacing(1),
    textAlign: 'center',
}));

const ActionButton = styled(Button)(({ theme }) => ({
    marginTop: theme.spacing(4),
    border: '2px solid #5d8842',
    borderRadius: '25px',
    color: '#5d8842',
    width: '90%',
    maxWidth: '300px',
    '&:hover': {
        backgroundColor: 'rgba(255, 111, 97, 0.1)',
        border: '2px solid #5d8842',
    },
}));


export default function CheckoutSuccessDesktop() {
    const { setOpenCartMenu, setCartItems, cartItems } = useContext(CartContext);
    const API_URL = import.meta.env.VITE_API_URL;
    const key = import.meta.env.VITE_CLIENT_KEY;
    const contactEmail = import.meta.env.VITE_CONTACT_EMAIL;
    const hasMountedRef = useRef();

    const linkProducts = () => {
        window.location.replace('/products');
    };

    useEffect(() => {
        if (!hasMountedRef.current) {
            hasMountedRef.current = true;
            const copiedCartItems = structuredClone(cartItems);

            const itemsHTML = Object.keys(copiedCartItems).map(key => {
            const item = copiedCartItems[key];
                return `
                    <div style="display: flex; align-items: center; margin-bottom: 10px;">
                    <div>
                        <strong>${item.name}</strong><br/>
                        Quantity: ${item.quantity}<br/>
                        Price: $${item.price}
                    </div>
                    </div>
                `;
            }).join('');

            const subtotalValue = Object.values(copiedCartItems).reduce((acc, item) => {
                return acc + (parseFloat(item.price) * item.quantity);
            }, 0).toFixed(2);

            const subtotalHTML = `
            <div style="border-top: 1px solid #ccc; padding-top: 10px; margin-top: 10px;">
                <strong>Subtotal:</strong><br/>
                Total Quantity: ${Object.values(copiedCartItems).reduce((acc, item) => acc + item.quantity, 0)}<br/>
                Total Price: $${subtotalValue}
            </div>
            `;
            
            // UPDATE
            const htmlInfo = {
                title: "Company Name - Order Placed",
                subtitle: `Someone has placed an order,`,
                whiteBoxText: `
                    <div>
                    <p>You can see more order info in <a href="https://www.app.vivreal.io/stripe/" target="_blank">Vivreal Orders</a>.</p>
                    <br/>
                    <h3 style="margin-bottom: 10px;">Ordered Items:</h3>
                    ${itemsHTML}
                    ${subtotalHTML}
                    </div>
                `,
                signature: 'Thanks for choosing Vivreal.',
            };
    
            axios.post(
            `${API_URL}/tenant/sendOrderPlacedEmail`,
            {
                to: contactEmail,
                htmlInfo
            },
            {
                headers: {
                    Authorization: key,
                    "Content-Type": "application/json",
                },
            });
        }
        setOpenCartMenu(false);
        setCartItems({});
    }, []);

    return (
        <PageContainer>
        <Header />
        <ContentContainer>
            <MessageContainer>
                <CheckCircleOutline sx={{ fontSize: '4rem', color: '#5d8842' }} />
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#5d8842' }}>
                    Thank You!
                </Typography>
                {/* UPDATE */}
                <Typography variant="body1" sx={{ fontSize: '1rem', color: '#5d8842' }}>
                    We appreciate your choice to shop with Company Name!
                </Typography>
            </MessageContainer>

            <ActionButton variant="outlined" onClick={linkProducts}>
                {'SHOP SOME MORE'}
            </ActionButton>
        </ContentContainer>
        <Footer />
    </PageContainer>
    );
}