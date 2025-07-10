import { Link } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';

// Keyframe Animation for Fade-in Effect
const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
`;

// Styled Components
const PageContainer = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  backgroundColor: '#e3ebdf',
  textAlign: 'center',
  padding: '20px',
  animation: `${fadeIn} 0.5s ease-in-out`,
}));

const ContentBox = styled(Box)(() => ({
  maxWidth: '600px',
  backgroundColor: '#fff',
  borderRadius: '16px',
  padding: '50px 30px',
  boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.2)',
}));

const Heading = styled(Typography)(() => ({
  fontSize: '5rem',
  fontWeight: 'bold',
  margin: '0',
  color: '#3c4748',
}));

const Text = styled(Typography)(() => ({
  fontSize: '1.3rem',
  color: '#5c5c5c',
  margin: '20px 0',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  fontSize: '1rem',
  fontWeight: 'bold',
  color: '#fff',
  background: '#5d8842',
  padding: theme.spacing(1.5, 4),
  borderRadius: '50px',
  textDecoration: 'none',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    background: '#497235',
    transform: 'translateY(-3px)',
  },
}));

const PageNotFound = () => {
  return (
    <PageContainer>
      <ContentBox>
        <Heading>404</Heading>
        <Text>Oops! The page you’re looking for doesn’t exist.</Text>
        <StyledButton component={Link} to="/">
          Go Back Home
        </StyledButton>
      </ContentBox>
    </PageContainer>
  );
};

export default PageNotFound;