import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';

const LoadingPage = () => {
  // UPDATE
  const sayings = [
    "Loading, please wait...",
    "Preparing your content...",
    "Setting things up...",
    "Fetching data...",
    "Just a moment...",
    "Loading resources...",
    "Initializing...",
    "Almost ready...",
    "Processing..."
  ];

  const [saying, setSaying] = useState("");

  useEffect(() => {
    const randomSaying = sayings[Math.floor(Math.random() * sayings.length)];
    setSaying(randomSaying);
  }, []);

  return (
    <>
      <Box
        sx={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'var(--color-surface-alt)',
          padding: 2,
          textAlign: 'center',
          transition: 'var(--transition-base)'
        }}
      >
        <img
          src='/siteAssets/placeHolder.png'
          alt="Loading logo"
          style={{
            width: '100px',
            height: 'auto',
            animation: 'spin 1.5s linear infinite',
            marginBottom: '20px',
            filter: 'drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.2))'
          }}
        />

        <Typography
          variant="h6"
          sx={{
            fontWeight: '600',
            color: 'var(--color-text-primary)',
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            maxWidth: '90%',
            transition: 'var(--transition-base)'
          }}
        >
          {saying}
        </Typography>
      </Box>
      <style>
        {`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        `}
      </style>
    </>
  );
};

export default LoadingPage;