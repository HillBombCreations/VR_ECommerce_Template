import { useState } from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import PropTypes from 'prop-types';

// Keyframe Animations
const slideInRight = keyframes`
  from { opacity: 0; transform: translateX(50px); }
  to { opacity: 1; transform: translateX(0); }
`;

const slideOutLeft = keyframes`
  from { opacity: 1; transform: translateX(0); }
  to { opacity: 0; transform: translateX(-50px); }
`;

const slideInLeft = keyframes`
  from { opacity: 0; transform: translateX(-50px); }
  to { opacity: 1; transform: translateX(0); }
`;

const slideOutRight = keyframes`
  from { opacity: 1; transform: translateX(0); }
  to { opacity: 0; transform: translateX(50px); }
`;

// Styled Components
const SectionWrapper = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#e3ebdf",
  paddingTop: "5vh",
  paddingBottom: '5vh',
  gap: "5vh",
}));

const CardContainer = styled(Box)(() => ({
  display: "flex",
  width: '90%',
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center"
}));

const ProductCard = styled(Box)(({ animation }) => ({
  backgroundColor: "#fff",
  borderRadius: "20px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "90%",
  height: '70vh',
  paddingLeft: "4%",
  paddingRight: "4%",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
  animation: animation ? `${animation} 0.5s ease-in-out` : "none",
  textAlign: "center"
}));

const ProductImage = styled("img")(() => ({
  width: "100%",
  maxHeight: "180px",
  objectFit: "contain",
  borderRadius: "12px",
  display: "block",
  marginBottom: "5vh",
}));

const ProductTitle = styled(Typography)(() => ({
  fontSize: "1.3rem",
  fontWeight: "bold",
  color: "#333",
  marginBottom: "1vh",
}));

const ProductDescription = styled(Typography)(() => ({
  fontSize: "0.8rem",
  color: "#666",
  lineHeight: "1.6"
}));

const ProductButton = styled(Button)(() => ({
  fontSize: "1rem",
  fontWeight: "bold",
  color: "#fff",
  background: "#5d8842",
  width: '80%',
  padding: "1vh 2vw",
  borderRadius: "50px",
  transition: "all 0.3s ease-in-out",
  display: "flex",
  alignItems: "center",
  marginTop: '5vh',
  "&:hover": {
    background: "#497235",
    transform: "translateY(-3px)",
  },
}));

const NavButtonsContainer = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  gap: "5vw"
}));

const NavButton = styled(IconButton)(() => ({
  background: "rgba(93, 136, 66, 0.9)",
  color: "#fff",
  borderRadius: "50%",
  textAlign: "center",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
  transition: "background 0.3s ease, transform 0.2s ease",

  "&:hover": {
    background: "#497235",
    transform: "scale(1.1)",
  },
}));

const ProductCarousel = ({ exploreProducts }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [animationType, setAnimationType] = useState(slideInRight);

    const nextCard = () => {
        setAnimationType(slideOutLeft);
        setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % exploreProducts.length);
            setAnimationType(slideInRight);
        }, 400);
    };

    const prevCard = () => {
        setAnimationType(slideOutRight);
        setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex - 1 + exploreProducts.length) % exploreProducts.length);
            setAnimationType(slideInLeft);
        }, 400);
    };

    return (
        <SectionWrapper>
            <CardContainer>
                <ProductCard animation={animationType}>
                    <ProductImage src={exploreProducts[currentIndex].image.currentFile.source} alt={exploreProducts[currentIndex].title} />
                    <ProductTitle>{exploreProducts[currentIndex].title}</ProductTitle>
                    <ProductDescription>{exploreProducts[currentIndex].description}</ProductDescription>
                    <ProductButton href={exploreProducts[currentIndex].link}>{exploreProducts[currentIndex].buttonLabel}</ProductButton>
                </ProductCard>
            </CardContainer>
            <NavButtonsContainer>
                <NavButton onClick={prevCard}>
                    <KeyboardArrowLeft />
                </NavButton>
                <NavButton onClick={nextCard}>
                    <KeyboardArrowRight />
                </NavButton>
            </NavButtonsContainer>
        </SectionWrapper>
    );
};

export default ProductCarousel;

ProductCarousel.propTypes = {
  exploreProducts: PropTypes.array.isRequired,
};