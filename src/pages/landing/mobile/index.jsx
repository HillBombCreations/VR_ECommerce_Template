import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Cookies from "js-cookie";

// Wrappers
import Header from "../../../components/wrappers/header/index.jsx";
import Footer from "../../../components/wrappers/footer/index.jsx";

// Components
import CookiePopup from "../../../components/universal/cookiePopup.jsx";
import SliderComponent from "./components/slider.jsx";
import CardComponent from "./components/cardComponent.jsx";
import ContactComponent from "./components/contactComponent.jsx";
import AboutComponent from "./components/aboutComponent.jsx";
import FetchedDataContext from '../../../context/fetchedDataContext.jsx';
import NoShippingBanner from "../../../components/universal/noShippingBanner/index.jsx";

// MUI Imports
import { Box, Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";


// CSS
import "../../../App.css";

// Styled Components
const PageContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(6),
  overflowY: "auto",
  background: "var(--color-surface)",
  scrollBehavior: "smooth",
  boxSizing: "border-box",
  width: "100vw",
}));

const LandingSection = styled(Box)(() => ({
  width: "90%",
  minHeight: "90vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "var(--color-surface)",
  color: 'var(--color-text-primary)',
  flexDirection: "column",
  gap: "5vw",
  textAlign: "center",
  padding: "12vh 4vw",
}));

const LandingContent = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  maxWidth: "90vw",
}));

const LandingTitle = styled(Typography)(() => ({
  fontSize: "2.5rem",
  fontWeight: "bold",
  textTransform: "uppercase",
  color: "var(--color-text-primary)",
  marginBottom: "16px",
}));

const LandingSubtitle = styled(Typography)(() => ({
  fontSize: "1rem",
  lineHeight: 1.5,
  color: "var(--color-text-secondary)",
  marginBottom: "24px",
  maxWidth: "90vw",
}));

const LandingLogo = styled("img")(() => ({
  maxWidth: "300px",
  height: "auto",
  marginBottom: '5vh',
  filter: "drop-shadow(var(--shadow-medium))",
}));

const LandingWrapper = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  gap: "50px",
}));

const LandingButton = styled(Button)(({ theme }) => ({
    fontSize: "1rem",
    fontWeight: "bold",
    textTransform: "uppercase",
    color: 'var(--color-text-inverse)',
    background: 'var(--color-primary)',
    padding: theme.spacing(1.5, 4),
    borderRadius: 'var(--radius-base)',
    boxShadow: 'var(--shadow-medium)',
    transition: 'var(--transition-base)',
    position: "relative",
    overflow: "hidden",
    "&::before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: "-100%",
        width: "300%",
        height: "100%",
        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
        transition: "all 0.4s ease-in-out",
    }
}));

const LandingPage = () => {
    const [acceptedCookieBool, setAcceptedCookieBool] = useState(Cookies.get("acceptedcookie"));
    const navigate = useNavigate();
    const {
        topSection,
        contactSection,
        aboutSection,
        cardSectionData,
        exploreProductData,
        businessInfo,
        siteLogo
    } = useContext(FetchedDataContext);

    const acceptCookies = () => {
        setAcceptedCookieBool(1);
        Cookies.set("acceptedcookie", 1);
    };

    return (
        <div
            style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            width: "100vw",
            overflowX: "hidden",
            }}
        >
            {
                !businessInfo?.shipping && (<NoShippingBanner />)
            }
            <Header />
            <PageContainer>
            <LandingSection>
                <LandingWrapper>
                    <LandingLogo src={topSection?.image?.currentFile?.source ? topSection.image.currentFile.source : siteLogo} alt={`${businessInfo.name} Logo`} />
                    <LandingContent>
                        <LandingTitle>{topSection.title}</LandingTitle>
                        <LandingSubtitle>
                            {topSection.subtitle}
                        </LandingSubtitle>
                        <LandingButton variant="contained" onClick={() => navigate('/products')}>Explore Products</LandingButton>
                    </LandingContent>               
                </LandingWrapper>
            </LandingSection>
            <SliderComponent exploreProducts={exploreProductData}/>
            <CardComponent qualityData={cardSectionData}/>
            <AboutComponent aboutSection={aboutSection}/>
            <ContactComponent contactSection={contactSection}/>
            </PageContainer>
            <Footer />
            {!acceptedCookieBool ? <CookiePopup acceptCookies={acceptCookies} /> : null}
        </div>
    );
};

LandingPage.propTypes = {
  xmlToJSON: PropTypes.any,
};

export default LandingPage;