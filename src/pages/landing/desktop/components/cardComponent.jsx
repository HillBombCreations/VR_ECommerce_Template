import { useState } from "react";
import { Box, Typography, Paper } from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";
import { LightbulbOutlined, AdsClickOutlined, Handshake } from "@mui/icons-material";
import PropTypes from 'prop-types';

// Animations
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

const SectionWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  backgroundColor: "var(--color-surface-alt)",
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

const StyledPaper = styled(Paper)(() => ({
  padding: "24px",
  display: "flex",
  alignItems: "center",
  gap: "16px",
  cursor: "pointer",
  borderRadius: "var(--radius-base)",
  transition: "var(--transition-base)",
  boxShadow: "var(--shadow-medium)",
  background: "var(--color-surface)",
  "&:hover": {
    background: "var(--color-primary)",
    "& .icon-box": {
      color: "var(--color-text-inverse)",
    },
    "& .card-text": {
      color: "var(--color-text-inverse)",
    },
  },

  "&.selected": {
    background: "var(--color-primary)",
    "& .icon-box": {
      color: "var(--color-text-inverse)",
    },
    "& .card-text": {
      color: "var(--color-text-inverse)",
    },
  },
}));


const IconBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "50px",
  height: "50px",
  borderRadius: "50%",
  transition: "var(--transition-base)",
  color: "var(--color-primary)",
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
  objectFit: "contain",
  borderRadius: "var(--radius-base)",
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
  color: "var(--color-text-primary)",
  transition: "var(--transition-base)",
}));

const BodyText = styled(Typography)(() => ({
  fontSize: "1rem",
  lineHeight: "1.5",
  color: "var(--color-text-secondary)",
  transition: "var(--transition-base)",
}));

const iconDict = {
  lightBulb: <LightbulbOutlined />,
  target: <AdsClickOutlined />,
  heart: <Handshake />
};

const CardComponent = ({ qualityData }) => {
  const [selectedCard, setSelectedCard] = useState(qualityData[0]);

  return (
    <SectionWrapper>
      <ContentWrapper>
        <CardContainer>
          <CardList>
            {qualityData.map((card, cardIdx) => {
              const isSelected = selectedCard.id === card.id;
              return (
                <StyledPaper
                  key={`productCard_${cardIdx}`}
                  onClick={() => setSelectedCard(card)}
                  className={isSelected ? "selected" : ""}
                >
                  <IconBox className="icon-box">
                    {iconDict[card.icon]}
                  </IconBox>
                  <Box>
                    <HeaderText className="card-text">{card.title}</HeaderText>
                    <BodyText className="card-text">
                      {card.description}
                    </BodyText>
                  </Box>
                </StyledPaper>
              );
            })}
          </CardList>
        </CardContainer>

        <ImageContainer key={`${selectedCard._id}`}>
          <ImagePreview
            src={selectedCard.imageSource}
            alt={selectedCard.title}
          />
        </ImageContainer>
      </ContentWrapper>
    </SectionWrapper>
  );
};

CardComponent.propTypes = {
  qualityData: PropTypes.array.isRequired,
};

export default CardComponent;