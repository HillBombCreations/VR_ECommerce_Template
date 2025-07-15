// node imports
import { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
// import ReactGA from 'react-ga4';
import axios from 'axios';

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
import { FetchedDataProvider } from './context/fetchedDataContext.jsx';
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

const API_URL = import.meta.env.VITE_API_URL;
const key = import.meta.env.VITE_CLIENT_KEY;
const siteColorsId = import.meta.env.VITE_SITE_COLORS_ID;

const getSitemap = async () => {
	return await axios.get(sitemap, { 'Content-Type': 'text/xml; charset=utf-8' });
}

const getSiteColorsCall = async () => {
	try {
		
		const { data } = await axios.get(`${API_URL}/tenant/collectionObjects`, {
            params: { collectionId: siteColorsId },
            headers: {
                Authorization: key,
                "Content-Type": "application/json",
            },
        });

		const colorData = data[0].objectValue;
		const root = document.documentElement;
		if (colorData.primary) root.style.setProperty('--color-primary', colorData.primary);
		if (colorData.secondary) root.style.setProperty('--color-secondary', colorData.secondary);
		if (colorData.hover) root.style.setProperty('--color-hover', colorData.hover);
		if (colorData.surface) root.style.setProperty('--color-surface', colorData.surface);
		if (colorData['surface-alt']) root.style.setProperty('--color-surface-alt', colorData['surface-alt']);
		if (colorData['text-primary']) root.style.setProperty('--color-text-primary', colorData['text-primary']);
		if (colorData['text-secondary']) root.style.setProperty('--color-text-secondary', colorData['text-secondary']);
		if (colorData['text-inverse']) root.style.setProperty('--color-text-inverse', colorData['text-inverse']);
		
	} catch (err) {
		console.error(err);
	}
};

class App extends Component {
	static contextType = NavigationContext;
	
	componentDidMount() {
		getSitemap().then(({ data }) => {
			const { url } = xmlToJSON(data);
			this.context.setInitialLoadingData(url, componentDictionary);
		});

		getSiteColorsCall().catch(console.error);
	}

	render() {
		return (
			<div className='app-styleguide app'>
				{
					this.context.routes.length ?
					<FetchedDataProvider>
						<CartProvider>
							<ProductsProvider>
								<Routes>
									{this.context.routes}
									<Route path='*' element={<PageNotFound />} />
								</Routes>
							</ProductsProvider>
						</CartProvider>
					</FetchedDataProvider>
					: <CircularProgress />
				}
			</div>
		);
	}
}

export default App
