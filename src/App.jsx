// node imports
import { useContext, useEffect, useState, useRef } from 'react';
import { Routes, Route } from 'react-router-dom';
// import ReactGA from 'react-ga4';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import LoadingPage from './pages/loadingPage/desktop/index.jsx';
// pages
import Landing from './pages/landing';
import PrivacyPolicy from './pages/privacyPolicy';
import FulfillmentPolicy from './pages/fulfillmentPolicy';
import TermsOfUse from './pages/termsOfUse';
import Products from './pages/products';
import CheckoutCancel from './pages/checkoutCancel';
import CheckoutSuccess from './pages/checkoutPage';
import ProductPage from './pages/productPage';
//
import PageNotFound from './pages/pageNotFound';

// context
import NavigationContext from './context/navigation';
import FetchedDataContext from './context/fetchedDataContext.jsx';
import { CartProvider } from './context/cartContext.jsx';
import { ProductsProvider } from './context/productsContext.jsx';

// components
import { CircularProgress } from '@mui/material';

// misc
import xmlToJSON from './utils/xmlToJSON.jsx';
import sitemap from '../sitemap.xml';

// global css
import './App.css';
import SiteMap from './pages/siteMap/index.jsx';

// google tag
// ReactGA.initialize('G-PDC9TXR6Q2');

const componentDictionary = {
	landing: Landing,
	products: Products,
	productPage: ProductPage,
	//
	privacyPolicy: PrivacyPolicy,
	termsOfUse: TermsOfUse,
	fulfillmentPolicy: FulfillmentPolicy,
	checkoutSuccess: CheckoutSuccess,
	checkoutCancel: CheckoutCancel,
	siteMap: SiteMap,

	//
	pageNotFound: PageNotFound,
};

const key = import.meta.env.VITE_CLIENT_KEY;
const siteId = import.meta.env.VITE_SITE_DETAILS_ID;

const  App = () => {
	const { setInitialLoadingData, routes } = useContext(NavigationContext);
	const {
		businessInfo,
        setBusinessInfo,
        setLastUpdatedAt,
        setExploreProductData,
        setCardSectionData,
        setTopSection,
        setContactSection,
        setAboutSection,
        setExploreProductSection,
        setSiteLogo,
		setIntegrationInfo
    } = useContext(FetchedDataContext);

	const [loading, setLoading] = useState(false);
	const hasMountedRef = useRef();

	const getSitemap = async () => {
		return await axios.get(sitemap, { 'Content-Type': 'text/xml; charset=utf-8' });
	};

	const updateFavicon = (iconUrl, sizes = null, type = 'image/png') => {
        const existingLink = document.querySelector(`link[rel="icon"][sizes="${sizes}"]`) || document.querySelector(`link[rel="icon"]:not([sizes])`);
        if (existingLink) existingLink.href = iconUrl;
        else {
            const link = document.createElement('link');
            link.rel = 'icon';
            link.type = type;
            link.href = iconUrl;
            if (sizes) link.sizes = sizes;
            document.head.appendChild(link);
        }
    };

	const getSiteDataCall = async () => {
		try {
			const { data } = await axios.get('https://client.vivreal.io/tenant/siteDetails', {
				params: { siteId: siteId },
				headers: {
					Authorization: key,
					"Content-Type": "application/json",
				},
			});

			const siteData = data.siteDetails.values;
			const root = document.documentElement;
			const faviconUrl = siteData?.logo?.currentFile?.source || '/siteAssets/placeHolder.png';
			const domainName =  data.domainName;
			await getSitemap().then(({ data }) => {
				const urls = xmlToJSON(data, domainName);
				setInitialLoadingData(urls, componentDictionary, domainName);
			});
			setBusinessInfo(data.businessInfo);
			setSiteLogo(faviconUrl);
			setIntegrationInfo(data.integrationInfo);
			updateFavicon(faviconUrl, '16x16', 'image/png');
			updateFavicon(faviconUrl, '32x32', 'image/png');
			// updateFavicon('/path/to/favicon.ico', null, 'image/x-icon');

			const formattedExplorerProducts = data.collectionObjs['Product Showcase'].map((obj) => {
                return {
                    id: obj.objectValue._id,
                    imageSource: obj.objectValue?.image?.source ? obj.objectValue.image.source : '/siteAssets/placeHolder.png',
                    title: obj.objectValue.title,
                    description: obj.objectValue.description,
                    link: obj.objectValue.link,
                    buttonLabel: obj.objectValue.buttonLabel,
                    productType: obj.objectValue['product-type']
                }
            });

			const formattedCardSection = data.collectionObjs['Our Offerings'].map((obj) => {
                return {
                    id: obj.objectValue._id,
                    imageSource: obj.objectValue?.image?.source ? obj.objectValue.image.source : '/siteAssets/placeHolder.png',
                    title: obj.objectValue.title,
                    description: obj.objectValue.description,
                    icon: obj.objectValue.icon,
                }
            });

			data.collectionObjs['Hero Sections'].map((obj) => {
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

           

			if (siteData.primary) root.style.setProperty('--color-primary', siteData.primary);
			if (siteData.secondary) root.style.setProperty('--color-secondary', siteData.secondary);
			if (siteData.hover) root.style.setProperty('--color-hover', siteData.hover);
			if (siteData.surface) root.style.setProperty('--color-surface', siteData.surface);
			if (siteData['surface-alt']) root.style.setProperty('--color-surface-alt', siteData['surface-alt']);
			if (siteData['text-primary']) root.style.setProperty('--color-text-primary', siteData['text-primary']);
			if (siteData['text-secondary']) root.style.setProperty('--color-text-secondary', siteData['text-secondary']);
			if (siteData['text-inverse']) root.style.setProperty('--color-text-inverse', siteData['text-inverse']);
			
			setCardSectionData(formattedCardSection);
			setExploreProductData(formattedExplorerProducts);
			setLastUpdatedAt(new Date());
		} catch (err) {
			console.error(err);
		}
	};

	const asyncHandler = async () => {
		try {
			setLoading(true);
			await getSiteDataCall();
		} catch (err) {
			console.error(err);
		} finally {
			setLoading(false);
		}
	
	}

	useEffect(() => {
		if (!hasMountedRef.current) {
			hasMountedRef.current = true;
			asyncHandler();
		}
	}, [])

	return (
		<div className='app-styleguide app'>
			<Helmet>
				<title>{businessInfo.name || 'Company Name'}</title>
				<meta
					name="description"
					content={`${businessInfo.name || 'Our Store'} is your trusted source for thoughtfully curated products.`}
				/>
			</Helmet>
			{ 
				loading ?
				<LoadingPage />
				:
				<>
				{
					routes.length ?
					<CartProvider>
						<ProductsProvider>
							<Routes>
								{routes}
								<Route path='*' element={<PageNotFound />} />
							</Routes>
						</ProductsProvider>
					</CartProvider>
					: <CircularProgress />
				}
				</>
			}
			
			
		</div>
	);
}

export default App
