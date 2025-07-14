import { Box, Typography, Button } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export default function ErrorLoadingProducts() {
    const backToHome = () => {
        window.location.replace('/');
    };

  return (
    <Box
        sx={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'var(--color-surface-alt)'
        }}
    >
      <ErrorOutlineIcon sx={{ fontSize: 60, color: 'var(--color-primary)' }} />
      <Typography variant="h6" sx={{ color: 'var(--color-text-primary)', fontWeight: 600 }}>
        Oops! We couldn’t load the products.
      </Typography>
      <Typography variant="body2" sx={{ color: 'var(--color-text-secondary)', maxWidth: 420 }}>
        Please check your internet connection and try again.
        <br />
        If the issue persists, it’s likely on our end — we’re already working to fix it.
      </Typography>
      <Button
        onClick={backToHome}
        variant="contained"
        sx={{
          mt: 2,
          backgroundColor: 'var(--color-text-primary)',
          color: 'var(--color-surface)',
          borderRadius: '25px',
          padding: '6px 18px',
        }}
      >
        Back to Home
      </Button>
    </Box>
  );
}