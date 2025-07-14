import { Box, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ErrorOutline } from '@mui/icons-material';
import CartContext from '../../../context/cartContext.jsx';

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
  border: '2px solid var(--color-error)',
  borderRadius: '25px',
  color: 'var(--color-error)',
  width: '90%',
  maxWidth: '300px',
  transition: 'var(--transition-base)',
  '&:hover': {
    backgroundColor: 'rgba(255, 111, 97, 0.1)',
    border: '2px solid var(--color-error)',
  },
}));

export default function CheckoutCancelledMobile() {
  const { setOpenCartMenu } = useContext(CartContext);
  const linkProducts = () => {
    window.location.replace('/products');
  };

  useEffect(() => {
    setOpenCartMenu(false);
  }, []);

  return (
    <PageContainer>
      <Header />
      <ContentContainer>
        <MessageContainer>
          <ErrorOutline sx={{ fontSize: '4rem', color: 'var(--color-error)' }} />
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'var(--color-error)' }}>
            Checkout Canceled
          </Typography>
          <Typography variant="body1" sx={{ fontSize: '1rem', color: 'var(--color-error)' }}>
            Your checkout process was canceled. You can return to shopping below.
          </Typography>
        </MessageContainer>

        <ActionButton variant="outlined" onClick={linkProducts}>
          CONTINUE SHOPPING
        </ActionButton>
      </ContentContainer>
      <Footer />
    </PageContainer>
  );
}