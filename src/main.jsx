import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { NavigationProvider } from './context/navigation.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
	<StrictMode>
		<BrowserRouter>
			<NavigationProvider>
				<App />
			</NavigationProvider>
		</BrowserRouter>
	</StrictMode>,
)
