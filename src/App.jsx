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

const getSitemap = async () => {
	return await axios.get(sitemap, { 'Content-Type': 'text/xml; charset=utf-8' });
}

class App extends Component {
	static contextType = NavigationContext;
	
	componentDidMount() {
		getSitemap().then(({ data }) => {
			const { url } = xmlToJSON(data);
			this.context.setInitialLoadingData(url, componentDictionary);
		});
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
