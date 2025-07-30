/* eslint-disable react/no-unescaped-entities */
import { Box, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { CheckCircleOutline } from '@mui/icons-material';
import CartContext from '../../../context/cartContext.jsx';
import FetchedDataContext from '../../../context/fetchedDataContext.jsx';

// Wrappers
import Header from "../../../components/wrappers/header/index.jsx";
import Footer from "../../../components/wrappers/footer/index.jsx";
import { useEffect, useContext } from 'react';

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

export default function CheckoutSuccessDesktop() {
  const { setOpenCartMenu, setCartItems } = useContext(CartContext);
  const { businessInfo } = useContext(FetchedDataContext);

  const linkProducts = () => {
    window.location.replace('/products');
  };

  useEffect(() => {
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
          {'SHOP SOME MORE'}
        </ActionButton>
      </ContentContainer>
      <Footer />
    </PageContainer>
  );
}