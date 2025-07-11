import { useState } from "react";
import { Box, Typography, Paper } from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";
import { Verified, Restaurant, Handshake } from "@mui/icons-material";
import PropTypes from 'prop-types';

// Keyframe Animations for Image Transition
const fadeSlideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ContentWrapper = styled(Box)(() => ({
    width: "80%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: "20px",
}));

// Styled Components
const SectionWrapper = styled(Box)(({ theme }) => ({
    width: "100%",
    display: "flex",
    backgroundColor: "#fff",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(8, 10),
    gap: theme.spacing(8),
}));

const CardList = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(3),
    width: "100%",
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(2),
    cursor: "pointer",
    borderRadius: "12px",
    transition: "all 0.3s ease",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    background: "#f8f8f8",
    "&:hover, &.selected": {
    background: "#5d8842",
    color: "#fff",
    transform: "translateY(-3px)",
    },
}));

const IconBox = styled(Box)(() => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "50px",
    height: "50px",
    borderRadius: "50%", 
    transition: "all 0.3s ease",
    color: "#5d8842",
}));

const ImageContainer = styled(Box)(() => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "60%",
    minHeight: "60vh",
    animation: `${fadeSlideIn} 0.5s ease-in-out`,
}));

const ImagePreview = styled("img")(() => ({
    width: "70%",
    height: "auto",
    maxHeight: "500px",
    objectFit: "cover",
    borderRadius: "8px",
}));

const CardContainer = styled(Box)(() => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "40%",
    minHeight: "60vh", 
}));

const HeaderText = styled(Typography)(() => ({
    fontSize: "1.4rem",
    fontWeight: "bold",
}));

const BodyText = styled(Typography)(() => ({
    fontSize: "1rem",
    lineHeight: "1.5",
}));

const iconDict = {
    verified: <Verified />,
    restaurant: <Restaurant />,
    handshake: <Handshake />
};

const CardComponent = ({ qualityData }) => {
    
    const [selectedCard, setSelectedCard] = useState({
        id: qualityData[0].id,
        image: qualityData[0].image,
        title: qualityData[0].title,
        description: qualityData[0].description,
        icon: qualityData[0].icon,
    });
    
    return (
        <SectionWrapper>
            <ContentWrapper>
                <CardContainer>
                    <CardList>
                        {qualityData.map((card) => (
                        <StyledPaper
                            key={card.id}
                            onClick={() => setSelectedCard(card)}
                            className={selectedCard.id === card.id ? "selected" : ""}
                            sx={{
                            "&:hover": {
                                background: "#5d8842",
                                color: "#fff",
                            },
                            }}
                        >
                            <IconBox
                                sx={{
                                    color: selectedCard.id === card.id ? "#f3efd2" : "#5d8842",
                                    transition: "color 0.3s ease",
                                    "&:hover": { color: "#f3efd2" },
                                }}
                            >
                                {iconDict[card.icon]}
                            </IconBox>
                            <Box>
                            <HeaderText>{card.title}</HeaderText>
                            <BodyText
                                sx={{
                                color: selectedCard.id === card.id ? "#f3efd2" : "#666",
                                }}
                            >
                                {card.description}
                            </BodyText>
                            </Box>
                        </StyledPaper>
                        ))}
                    </CardList>
                </CardContainer>
                <ImageContainer key={selectedCard.id}>
                    <ImagePreview src={selectedCard.image.currentFile.source} alt={selectedCard.title} />
                </ImageContainer>
            </ContentWrapper>
        </SectionWrapper>
    );
};

export default CardComponent;

CardComponent.propTypes = {
    qualityData: PropTypes.array.isRequired,
};