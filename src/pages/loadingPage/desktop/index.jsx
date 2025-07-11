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
            backgroundColor: '#f8f1e5',
            }}
        >
            <img
            src='/siteAssets/placeHolder.png'
            alt="Loading logo"
            style={{
                width: '150px',
                height: 'auto',
                animation: 'spin 1.5s linear infinite',
                marginBottom: '30px',
                filter: 'drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.2))'
            }}
            />

            <Typography
            variant="h5"
            sx={{
                fontWeight: '600',
                color: '#8B4513',
                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                display: 'inline-block',
                textAlign: 'center',
                maxWidth: '90%'
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