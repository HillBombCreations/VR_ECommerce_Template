import { useEffect, useState } from 'react';
import { Alert, Button, Box, Typography } from '@mui/material';
import Cookies from 'js-cookie';

export default function ShippingBannerMobile() {
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
        sx={{
          backgroundColor: '#fefefe',
          color: '#2e2e2e',
          borderBottom: '1px solid #e0e0e0',
          boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          px: 2,
          py: 1.5,
        }}
        action={
          <Button
            variant="contained"
            size="small"
            fullWidth
            onClick={handleDismissBanner}
            sx={{
              mt: 1,
              backgroundColor: 'rgba(93, 136, 66, 0.9)',
              color: '#fff',
              textTransform: 'none',
              fontWeight: 500,
              borderRadius: '6px',
              '&:hover': {
                backgroundColor: '#2f4f87',
              },
            }}
          >
            I Understand
          </Button>
        }
      >
        <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
          We do <strong>not offer shipping</strong>. All items are for local pickup or digital delivery only.
        </Typography>
      </Alert>
    </Box>
  );
}