import { Box, Typography, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { LightbulbOutlined, AdsClickOutlined, Handshake } from "@mui/icons-material";
import PropTypes from 'prop-types';

const SectionWrapper = styled(Box)(() => ({
  width: "90%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "var(--color-surface-alt)",
  padding: "5vh 5vw",
  gap: "5vh"
  
}));

const ContentWrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  alignItems: "center",
  justifyContent: "center",
  gap: "5vw"

}));

const CardContainer = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "90%",
  minHeight: "auto",
}));

const CardList = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(3),
  width: "100%",
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  display: "flex",
  borderRadius: "12px",
  transition: "all 0.3s ease",
  boxShadow: "var(--shadow-medium)",
  background: "var(--color-surface)",
  flexDirection: "column",
  alignItems: "flex-start",
  padding: theme.spacing(3),
  gap: theme.spacing(2),
  cursor: { xs: "default", md: "pointer" },
}));

const IconBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "50px",
  height: "50px",
  borderRadius: "50%",
  transition: "all 0.3s ease",
  color: "var(--color-primary)",
}));

const HeaderText = styled(Typography)(() => ({
  fontSize: "1.4rem",
  fontWeight: "bold",
}));

const BodyText = styled(Typography)(() => ({
  fontSize: "1rem",
  lineHeight: "1.5",
  color: 'var(--color-text-secondary)'
}));

const iconDict = {
  lightBulb: <LightbulbOutlined />,
  target: <AdsClickOutlined />,
  heart: <Handshake />
};

// Component
const CardComponent = ({ qualityData }) => {
    return (
        <SectionWrapper>
            <ContentWrapper>
                <CardContainer>
                    <CardList>
                        {qualityData.map((card) => (
                            <StyledPaper
                                key={card.id}
                                sx={{
                                    
                                }}
                            >
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                    <IconBox>{iconDict[card.icon]}</IconBox>
                                    <HeaderText>{card.title}</HeaderText>
                                </Box>
                                <BodyText>{card.description}</BodyText>
                            </StyledPaper>
                        ))}
                    </CardList>
                </CardContainer>
            </ContentWrapper>
        </SectionWrapper>
    );
};

export default CardComponent;

CardComponent.propTypes = {
  qualityData: PropTypes.array.isRequired,
};