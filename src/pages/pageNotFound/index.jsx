import { Link } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';

// Fade-in animation
const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
`;

// Styled Components using CSS variables
const PageContainer = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  backgroundColor: 'var(--color-surface-alt)',
  textAlign: 'center',
  padding: '20px',
  animation: `${fadeIn} 0.5s ease-in-out`,
}));

const ContentBox = styled(Box)(() => ({
  maxWidth: '600px',
  backgroundColor: 'var(--color-surface)',
  borderRadius: 'var(--radius-base)',
  padding: '50px 30px',
  boxShadow: 'var(--shadow-medium)',
  transition: 'var(--transition-base)',
}));

const Heading = styled(Typography)(() => ({
  fontSize: '5rem',
  fontWeight: 'bold',
  margin: '0',
  color: 'var(--color-text-primary)',
}));

const Text = styled(Typography)(() => ({
  fontSize: '1.3rem',
  color: 'var(--color-text-secondary)',
  margin: '20px 0',
}));

const StyledButton = styled(Button)(() => ({
  fontSize: '1rem',
  fontWeight: 'bold',
  color: 'var(--color-text-inverse)',
  background: 'var(--color-primary)',
  padding: '12px 32px',
  borderRadius: '50px',
  textDecoration: 'none',
  transition: 'var(--transition-base)',
  '&:hover': {
    background: 'var(--color-primary-hover)',
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