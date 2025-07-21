import { Box, Typography } from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";
import PropTypes from 'prop-types';

// Keyframe Animation for Fade-in
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const SectionWrapper = styled(Box)(() => ({
  width: "90%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "var(--color-surface-alt)",
  padding: "5vh 5vw",
  gap: "20px",
}));

const ContentWrapper = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "5vw",
  animation: `${fadeIn} 0.8s ease-in-out`,
  flexDirection: "column",
  textAlign: "center",
  width: "100%",
}));

const ImageContainer = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "80%",
  minHeight: "auto",
  objectFit: "contain",
}));

const ProfileImage = styled("img")(() => ({
  width: "250px",
  maxWidth: "350px",
  objectFit: "contain",
  borderRadius: "12px",
}));

const TextContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  width: "90%",
  alignItems: "center",
  textAlign: "center",
  minHeight: "auto",
}));

const SectionTitle = styled(Typography)(() => ({
  fontSize: "2rem",
  fontWeight: "bold",
  color: "var(--color-text-primary)",
  marginBottom: "2vh",
}));

const SectionSubtitle = styled(Typography)(() => ({
  fontSize: "1rem",
  color: "var(--color-text-secondary)",
  lineHeight: "1.6",
  textAlign: 'start',
}));

const AboutSection = ({ aboutSection }) => {
  return (
    <SectionWrapper>
      <ContentWrapper>
        <ImageContainer>
          <ProfileImage src={aboutSection.image?.currentFile?.source ? aboutSection.image.currentFile.source : '/siteAssets/placeHolder.png' } alt="Owner" />
        </ImageContainer>
        <TextContainer>
          <SectionTitle>{aboutSection.title}</SectionTitle>
          <SectionSubtitle dangerouslySetInnerHTML={{ __html: aboutSection.subtitle }} />
        </TextContainer>
      </ContentWrapper>
    </SectionWrapper>
  );
};

export default AboutSection;

AboutSection.propTypes = {
    aboutSection: PropTypes.object.isRequired,
};