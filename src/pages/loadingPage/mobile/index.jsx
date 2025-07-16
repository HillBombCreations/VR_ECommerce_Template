import { Box, CircularProgress } from '@mui/material';

const LoadingPage = () => {
  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--color-surface-alt)',
        transition: 'var(--transition-base)',
      }}
    >
      <CircularProgress size={64} thickness={4} sx={{ background: 'var(--color-primary)'}} />
    </Box>
  );
};

export default LoadingPage;