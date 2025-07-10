import { useEffect, useState } from 'react';
import { Alert, Button, Box } from '@mui/material';
import Cookies from 'js-cookie';

export default function ShippingBanner() {
  const [showBanner, setShowBanner] = useState(false);

  const handleDismissBanner = () => {
    Cookies.set('acceptedNoShipping', 'true', { expires: 365 });
    setShowBanner(false);
  };

  useEffect(() => {
    const accepted = Cookies.get('acceptedNoShipping');
    if (!accepted) {
      setShowBanner(true);
    }
  }, []);

  if (!showBanner) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 2000,
      }}
    >
      <Alert
        severity="info"
        icon={false}
        action={
          <Button
            variant="contained"
            size="small"
            onClick={handleDismissBanner}
            sx={{
              backgroundColor: 'rgba(93, 136, 66, 0.9)',
              color: '#fff',
              textTransform: 'none',
              fontWeight: 500,
              marginRight: 2,
              borderRadius: '6px',
              '&:hover': {
                backgroundColor: '#2f4f87',
              },
            }}
          >
            I Understand
          </Button>
        }
        sx={{
          backgroundColor: '#fefefe',
          color: '#2e2e2e',
          borderBottom: '1px solid #e0e0e0',
          boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
          py: 1.5,
          px: 3,
          fontSize: '0.95rem',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        We do <strong>not offer shipping</strong>. All items are for local pickup or digital delivery only.
      </Alert>
    </Box>
  );
}