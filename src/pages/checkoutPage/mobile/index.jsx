/* eslint-disable react/no-unescaped-entities */
import { Box, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { CheckCircleOutline } from '@mui/icons-material';
import { useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import Header from "../../../components/wrappers/header/index.jsx";
import Footer from "../../../components/wrappers/footer/index.jsx";
import CartContext from '../../../context/cartContext.jsx';
import FetchedDataContext from '../../../context/fetchedDataContext.jsx';
const PageContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  backgroundColor: 'var(--color-surface-alt)',
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
  border: '2px solid var(--color-primary)',
  borderRadius: '25px',
  color: 'var(--color-primary)',
  width: '90%',
  maxWidth: '300px',
  transition: 'var(--transition-base)',
  '&:hover': {
    backgroundColor: 'var(--color-hover)',
    border: '2px solid var(--color-primary)',
  },
}));

export default function CheckoutSuccessMobile() {
  const { setOpenCartMenu, setCartItems, cartItems } = useContext(CartContext);
  const { businessInfo } = useContext(FetchedDataContext);
  const API_URL = 'https://client.vivreal.io';
  const key = import.meta.env.VITE_CLIENT_KEY;
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

      const htmlInfo = {
        title: `${businessInfo.name} - Order Placed`,
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
          to: businessInfo.contactInfo.emai,
          htmlInfo
        },
        {
          headers: {
            Authorization: key,
            "Content-Type": "application/json",
          },
        }
      );
    }

    setOpenCartMenu(false);
    setCartItems({});
  }, []);

  return (
    <PageContainer>
      <Header />
      <ContentContainer>
        <MessageContainer>
          <CheckCircleOutline sx={{ fontSize: '4rem', color: 'var(--color-primary)' }} />
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'var(--color-text-primary)' }}>
            Thank You!
          </Typography>
          <Typography variant="body1" sx={{ fontSize: '1rem', color: 'var(--color-text-secondary)' }}>
            We appreciate your choice to shop with {businessInfo.name}!
          </Typography>
        </MessageContainer>

        <ActionButton variant="outlined" onClick={linkProducts}>
          SHOP SOME MORE
        </ActionButton>
      </ContentContainer>
      <Footer />
    </PageContainer>
  );
}