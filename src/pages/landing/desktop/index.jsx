import { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import axios from 'axios';
import LoadingPage from '../../loadingPage/desktop/index.jsx';

// Wrappers
import Header from '../../../components/wrappers/header/index.jsx';
import Footer from '../../../components/wrappers/footer/index.jsx';

// Components
import CookiePopup from '../../../components/pages/landing/cookiePopup/index.jsx';
import SliderComponent from './components/slider.jsx';
import CardComponent from './components/cardComponent.jsx';
import ContactComponent from './components/contactComponent.jsx';
import AboutComponent from './components/aboutComponent.jsx';
import FetchedDataContext from '../../../context/fetchedDataContext.jsx';
// import NoShippingBanner from '../../../components/universal/noShippingBanner/index.jsx';

// MUI Imports
import { Box, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
// CSS
import '../../../App.css';

const PageContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(6),
    overflowY: 'auto',
    background: '#fff',
    overflowX: 'hidden',
    scrollBehavior: 'smooth',
    boxSizing: 'border-box',
    width: '100vw',
}));

const LandingSection = styled(Box)(() => ({
    width: '100%',
    minHeight: '90vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#fff',
    color: '#3c4748',
    paddingTop: '50px',
    paddingBottom: '50px'
}));

const LandingContent = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    textAlign: 'left',
    maxWidth: '500px',
}));

const LandingTitle = styled(Typography)(() => ({
    fontSize: '3.5rem',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: '#3c4748',
    marginBottom: '16px',
}));

const LandingSubtitle = styled(Typography)(() => ({
    fontSize: '1.2rem',
    lineHeight: 1.5,
    color: '#5c5c5c',
    marginBottom: '24px',
}));

const LandingLogo = styled('img')(() => ({
    maxWidth: '500px',
    height: 'auto',
    filter: 'drop-shadow(0px 4px 10px rgba(208, 173, 123, 0.5))',
}));

const LandingWrapper = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '100px',
}));

const LandingButton = styled(Button)(({ theme }) => ({
    fontSize: '1rem',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: '#ffffff',
    background: 'linear-gradient(135deg, #5d8842 0%, #3c5f2c 100%)',
    padding: theme.spacing(1.5, 4),
    borderRadius: '50px',
    boxShadow: '0px 4px 15px rgba(93, 136, 66, 0.3)',
    transition: 'all 0.4s ease-in-out',
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: '-100%',
        width: '300%',
        height: '100%',
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
        transition: 'all 0.4s ease-in-out',
    },
    '&:hover::before': {
        left: '100%',
    },
    '&:hover': {
        background: 'linear-gradient(135deg, #3c5f2c 0%, #5d8842 100%)',
        boxShadow: '0px 8px 25px rgba(93, 136, 66, 0.6)',
        transform: 'translateY(-3px)',
    },
}));

const LandingPage = () => {
    const navigate = useNavigate();
    const {
        topSection,
        contactSection,
        aboutSection,
        exploreProductSection,
        cardSectionData,
        exploreProductData,
        lastUpdatedAt,
        setLastUpdatedAt,
        setExploreProductData,
        setCardSectionData,
        setTopSection,
        setContactSection,
        setAboutSection,
        setExploreProductSection
    } = useContext(FetchedDataContext);
    const [acceptedCookieBool, setAcceptedCookieBool] = useState(Cookies.get('acceptedcookie'));
    const [loadingContent, setLoadingContent] = useState(true);
    const hasMountedRef = useRef();

    const API_URL = import.meta.env.VITE_API_URL;
    const key = import.meta.env.VITE_CLIENT_KEY;
    const landingSectionId = import.meta.env.VITE_LANDING_SECTION_ID;
    const exploreProductsId = import.meta.env.VITE_EXPLORE_PRODUCTS_ID;
    const cardSectionDataId = import.meta.env.VITE_CARD_SECTION_ID;

    const getSiteDataCall = async () => {
        const landingSectionPromise = axios.get(`${API_URL}/tenant/collectionObjects`, {
            params: { collectionId: landingSectionId },
            headers: {
                Authorization: key,
                "Content-Type": "application/json",
            },
        }).then((fetchedLandingSection) => {
            fetchedLandingSection.data.map((obj) => {
                switch (obj.objectValue.sectionName) {
                    case 'aboutSection':
                        setAboutSection(obj.objectValue);
                        break;
                    case 'topSection':
                        setTopSection(obj.objectValue);
                        break;
                    case 'exploreProducts':
                        setExploreProductSection(obj.objectValue);
                        break;
                    case 'contactSection':
                        setContactSection(obj.objectValue);
                        break;
                }
            });
        });

        const exploreProductsPromise = axios.get(`${API_URL}/tenant/collectionObjects`, {
            params: { collectionId: exploreProductsId },
            headers: {
                Authorization: key,
                "Content-Type": "application/json",
            },
        }).then((fetchedExploreProducts) => {
            const formattedExplorerProducts = fetchedExploreProducts.data.map((obj) => {
                return {
                    id: obj.objectValue.productId,
                    image: obj.objectValue.image,
                    title: obj.objectValue.title,
                    description: obj.objectValue.description,
                    link: obj.objectValue.link,
                    buttonLabel: obj.objectValue.buttonLabel,
                }
            });
            setExploreProductData(formattedExplorerProducts);
        });

        const cardSectionPromise = axios.get(`${API_URL}/tenant/collectionObjects`, {
            params: { collectionId: cardSectionDataId },
            headers: {
                Authorization: key,
                "Content-Type": "application/json",
            },
        }).then((fetchedCardSectionData) => {
            const formattedCardSection = fetchedCardSectionData.data.map((obj) => {
                return {
                    id: obj.objectValue.productId,
                    image: obj.objectValue.image,
                    title: obj.objectValue.title,
                    description: obj.objectValue.description,
                    icon: obj.objectValue.icon,
                }
            });
            setCardSectionData(formattedCardSection);
        });
        
        setLastUpdatedAt(new Date());

        await Promise.all([landingSectionPromise, exploreProductsPromise, cardSectionPromise]);
    }

    const handleSiteData = async () => {
        try {
            if (!lastUpdatedAt) await getSiteDataCall();
            else {
                const { data } = await axios.get(`${API_URL}/tenant/checkLastUpdateAt`, {
                    params: { lastUpdatedAt: lastUpdatedAt },
                    headers: {
                        Authorization: key,
                        "Content-Type": "application/json",
                    },
                });

                if (data === 'update') await getSiteDataCall();
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingContent(false);
        }
    };

    const acceptCookies = () => {
        setAcceptedCookieBool(1);
        Cookies.set('acceptedcookie', 1);
    };

    useEffect(() => {
        if (!hasMountedRef.current) {
            hasMountedRef.current = true;
            handleSiteData();
        }
    }, []);
    return (
        <>
            {loadingContent ? (
                <LoadingPage />
            ) : (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        minHeight: '100vh',
                        width: '100vw',
                        overflowX: 'hidden',
                    }}
                >
                   {/* <NoShippingBanner /> */}
                    <Header />
                    <PageContainer>
                        <LandingSection>
                            <LandingWrapper>
                                <LandingContent>
                                    <LandingTitle>{topSection.title}</LandingTitle>
                                    <LandingSubtitle>
                                        {topSection.subtitle}
                                    </LandingSubtitle>
                                    <LandingButton onClick={() => navigate('/products')} variant="contained">{topSection.buttonLabel}</LandingButton>
                                </LandingContent>
                                {/* UPDATE */}
                                <LandingLogo src={topSection.image.currentFile.source} alt="Comapny Name Logo" />
                            </LandingWrapper>
                        </LandingSection>
                        <SliderComponent exploreProductSection={exploreProductSection} exploreProducts={exploreProductData}/>
                        <CardComponent qualityData={cardSectionData} />
                        <AboutComponent aboutSection={aboutSection} />
                        <ContactComponent contactSection={contactSection} />
                    </PageContainer>
                    <Footer />
                    {!acceptedCookieBool && <CookiePopup acceptCookies={acceptCookies} />}
                </div>
            )}
        </>
    );
};

LandingPage.propTypes = {
    xmlToJSON: PropTypes.any,
};

export default LandingPage;