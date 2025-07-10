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
        backgroundColor: '#f8f1e5',
        }}
    >
      <ErrorOutlineIcon sx={{ fontSize: 60, color: '#5d8842' }} />
      <Typography variant="h6" sx={{ color: '#333', fontWeight: 600 }}>
        Oops! We couldn’t load the products.
      </Typography>
      <Typography variant="body2" sx={{ color: '#666', maxWidth: 420 }}>
        Please check your internet connection and try again.
        <br />
        If the issue persists, it’s likely on our end — we’re already working to fix it.
      </Typography>
      <Button
        onClick={backToHome}
        variant="contained"
        sx={{
          mt: 2,
          backgroundColor: '#5d8842',
          color: '#fff',
          borderRadius: '25px',
          padding: '6px 18px',
          '&:hover': {
            backgroundColor: '#4a7336',
          },
        }}
      >
        Back to Home
      </Button>
    </Box>
  );
}