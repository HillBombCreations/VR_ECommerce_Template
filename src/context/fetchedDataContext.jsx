import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const FetchedDataContext = createContext({
    contactSection: {},
    setContactSection: () => {},

    aboutSection: {},
    setAboutSection: () => {},

    exploreProductSection: {},
    setExploreProductSection: () => {},

    topSection: {},
    setTopSection: () => {},

    exploreProductData: [],
    setExploreProductData: () => {},

    cardSectionData: [],
    setCardSectionData: () => {},

    lastUpdatedAt: null,
    setLastUpdatedAt: () => {},

    businessInfo: {},
    setBusinessInfo: () => {},

    siteLogo: null,
    setSiteLogo: () => {},
});

export default FetchedDataContext;

export const FetchedDataProvider = ({ children }) => {
    const [contactSection, setContactSection] = useState(() => {
        const savedContactSection = localStorage.getItem('contactSection');
        if (savedContactSection) return JSON.parse(savedContactSection);
        return {};
    });

    const [businessInfo, setBusinessInfo] = useState(() => {
        const savedBusinessInfo = localStorage.getItem('businessInfo');
        if (savedBusinessInfo) return JSON.parse(savedBusinessInfo);
        return {};
    });

    const [aboutSection, setAboutSection] = useState(() => {
        const savedAboutSection = localStorage.getItem('aboutSection');
        if (savedAboutSection) return JSON.parse(savedAboutSection);
        return {};
    });

    const [exploreProductSection, setExploreProductSection] = useState(() => {
        const savedExploreProductSection = localStorage.getItem('exploreProductSection');
        if (savedExploreProductSection) return JSON.parse(savedExploreProductSection);
        return {};
    });

    const [topSection, setTopSection] = useState(() => {
        const savedTopSection = localStorage.getItem('topSection');
        if (savedTopSection) return JSON.parse(savedTopSection);
        return {};
    });

    const [exploreProductData, setExploreProductData] = useState(() => {
        const savedExploreProductData = localStorage.getItem('exploreProductData');
        if (savedExploreProductData) return JSON.parse(savedExploreProductData);
        return [];
    });

    const [cardSectionData, setCardSectionData] = useState(() => {
        const savedCardSectionData = localStorage.getItem('cardSectionData');
        if (savedCardSectionData) return JSON.parse(savedCardSectionData);
        return [];
    });

    const [siteLogo, setSiteLogo] = useState(() => {
        const savedSiteLogo = localStorage.getItem('siteLogo');
        if (savedSiteLogo) return JSON.parse(savedSiteLogo);
        return {};
    });

    const [lastUpdatedAt, setLastUpdatedAt] = useState(() => {
        const savedLastUpdatedAt = localStorage.getItem('lastUpdatedAt');
        if (savedLastUpdatedAt) return JSON.parse(savedLastUpdatedAt);
        return null;
    });

    useEffect(() => {
        if (aboutSection) localStorage.setItem('aboutSection', JSON.stringify(aboutSection));
        else localStorage.removeItem('aboutSection');
    }, [aboutSection]);

    useEffect(() => {
        if (contactSection) localStorage.setItem('contactSection', JSON.stringify(contactSection));
        else localStorage.removeItem('contactSection');
    }, [contactSection]);

    useEffect(() => {
        if (exploreProductSection) localStorage.setItem('exploreProductSection', JSON.stringify(exploreProductSection));
        else localStorage.removeItem('exploreProductSection');
    }, [exploreProductSection]);

    useEffect(() => {
        if (topSection) localStorage.setItem('topSection', JSON.stringify(topSection));
        else localStorage.removeItem('topSection');
    }, [topSection]);

    useEffect(() => {
        if (exploreProductData) localStorage.setItem('exploreProductData', JSON.stringify(exploreProductData));
        else localStorage.removeItem('exploreProductData');
    }, [exploreProductData]);

    useEffect(() => {
        if (cardSectionData) localStorage.setItem('cardSectionData', JSON.stringify(cardSectionData));
        else localStorage.removeItem('cardSectionData');
    }, [cardSectionData]);

     useEffect(() => {
        if (siteLogo) localStorage.setItem('siteLogo', JSON.stringify(siteLogo));
        else localStorage.removeItem('siteLogo');
    }, [siteLogo]);

    useEffect(() => {
        if (lastUpdatedAt) localStorage.setItem('lastUpdatedAt', JSON.stringify(lastUpdatedAt));
        else localStorage.removeItem('lastUpdatedAt');
    }, [lastUpdatedAt]);

    useEffect(() => {
        if (businessInfo) localStorage.setItem('businessInfo', JSON.stringify(businessInfo));
        else localStorage.removeItem('businessInfo');
    }, [businessInfo]);

    return (
        <FetchedDataContext.Provider value={{
            contactSection, setContactSection,
            aboutSection, setAboutSection,
            exploreProductSection, setExploreProductSection,
            topSection, setTopSection,
            exploreProductData, setExploreProductData,
            cardSectionData, setCardSectionData,
            lastUpdatedAt, setLastUpdatedAt,
            siteLogo, setSiteLogo,
            businessInfo, setBusinessInfo,
        }}>
            {children}
        </FetchedDataContext.Provider>
    );
};

FetchedDataProvider.propTypes = {
  children: PropTypes.any,
};