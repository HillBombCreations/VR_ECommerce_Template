import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import PropTypes from 'prop-types';

const ContentWrapper = styled(Box)(() => ({
    width: "80%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: "20px",
}));

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
    gap: "20px",
}));

const ImageContainer = styled(Box)(() => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
    minHeight: "50vh",
}));

const ProfileImage = styled("img")(() => ({
    width: "400px",
    height: "400px",
    objectFit: "contain",
    borderRadius: "0",
}));

const TextContainer = styled(Box)(() => ({
    display: "flex",
    flexDirection: 'column',
    alignItems: "start",
    justifyContent: "center",
    width: "50%",
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

// Component
const AboutSection = ({ aboutSection }) => {
  return (
    <SectionWrapper>
        <ContentWrapper>
            <ImageContainer>
                <ProfileImage src={aboutSection.image.currentFile.source} alt="Owner Photo" />
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
    aboutSection: PropTypes.object.isRequired
};