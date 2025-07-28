import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { HelmetProvider } from 'react-helmet-async';
import { NavigationProvider } from './context/navigation.jsx';
import { FetchedDataProvider } from './context/fetchedDataContext.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
	<StrictMode>
		<BrowserRouter>
			<NavigationProvider>
				<FetchedDataProvider>
					<HelmetProvider>
						<App />
					</HelmetProvider>
				</FetchedDataProvider>
			</NavigationProvider>
		</BrowserRouter>
	</StrictMode>,
)
