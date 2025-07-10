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
const ContentWrapper = styled(Box)(() => ({
    width: "80%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: "20px",
}));

const SectionWrapper = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#e3ebdf",
  paddingTop: "5vh",
  paddingBottom: '5vh',
  gap: "20px",
}));

const TextContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: 'column',
  alignItems: "start",
  justifyContent: "center",
  width: "40%",
  minHeight: "50vh",
}));

const SectionTitle = styled(Typography)(() => ({
  fontSize: "2.5rem",
  fontWeight: "bold",
  color: "#3c4748",
  marginBottom: "2vh",
}));

const SectionSubtitle = styled(Typography)(() => ({
  fontSize: "1.2rem",
  color: "#5c5c5c",
  lineHeight: "1.6",
}));

const CardContainer = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "60%",
  minHeight: "50vh",
}));

const ProductCard = styled(Box)(({ animation }) => ({
  backgroundColor: "#fff",
  borderRadius: "20px",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  width: "70%",
  minHeight: "40vh",
  padding: "3%",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
  animation: animation ? `${animation} 0.5s ease-in-out` : "none",
}));

const ProductImageContainer = styled(Box)(() => ({
  width: "45%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const ProductImage = styled("img")(() => ({
  width: "100%",
  height: "250px",
  objectFit: "cover",
  borderRadius: "12px",
  display: "block",
}));

const ProductContent = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
  width: "55%",
  paddingLeft: "4%",
}));

const ProductTitle = styled(Typography)(() => ({
  fontSize: "1.8rem",
  fontWeight: "bold",
  color: "#333",
  marginBottom: "1vh",
}));

const ProductDescription = styled(Typography)(() => ({
  fontSize: "1rem",
  color: "#666",
  lineHeight: "1.6",
  marginBottom: "3vh",
}));

const ProductButton = styled(Button)(() => ({
  fontSize: "1rem",
  fontWeight: "bold",
  color: "#fff",
  background: "#5d8842",
  padding: "1vh 2vw",
  borderRadius: "50px",
  transition: "all 0.3s ease-in-out",
  display: "flex",
  alignItems: "center",
  gap: "1vw",
  "& .arrow": {
    transform: "translateX(-10px)",
    opacity: 0,
    transition: "transform 0.3s ease, opacity 0.3s ease",
  },
  "&:hover": {
    background: "#497235",
    transform: "translateY(-3px)",
  },
  "&:hover .arrow": {
    transform: "translateX(0)",
    opacity: 1,
  },
}));

const NavButton = styled(IconButton)(() => ({
  background: "rgba(93, 136, 66, 0.9)",
  color: "#fff",
  borderRadius: "50%",
  textAlign: 'center',
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
  transition: "background 0.3s ease, transform 0.2s ease",
  "&:hover": {
    background: "#497235",
    transform: "scale(1.1)",
  },
}));

const ProductCarousel = ({ exploreProducts, exploreProductSection }) => {
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
        <ContentWrapper>
            <CardContainer>
                <NavButton style={{ marginRight: '10px' }} onClick={prevCard}>
                    <KeyboardArrowLeft />
                </NavButton>
                <ProductCard animation={animationType}>
                    <ProductImageContainer>
                        <ProductImage src={exploreProducts[currentIndex].image.currentFile.source} alt={exploreProducts[currentIndex].title} />
                    </ProductImageContainer>
                    <ProductContent>
                        <ProductTitle>{exploreProducts[currentIndex].title}</ProductTitle>
                        <ProductDescription>{exploreProducts[currentIndex].description}</ProductDescription>
                        <ProductButton href={exploreProducts[currentIndex].link}>
                          {exploreProducts[currentIndex].buttonLabel}
                        </ProductButton>
                    </ProductContent>
                </ProductCard>
                <NavButton style={{ marginLeft: '10px' }} onClick={nextCard}>
                <KeyboardArrowRight />
                </NavButton>
            </CardContainer>
            <TextContainer>
                <SectionTitle>{exploreProductSection.title}</SectionTitle>
                <SectionSubtitle>{exploreProductSection.subtitle}</SectionSubtitle>
            </TextContainer>
        </ContentWrapper>
    </SectionWrapper>
  );
};

export default ProductCarousel;

ProductCarousel.propTypes = {
    exploreProducts: PropTypes.array.isRequired,
    exploreProductSection: PropTypes.object.isRequired,
};