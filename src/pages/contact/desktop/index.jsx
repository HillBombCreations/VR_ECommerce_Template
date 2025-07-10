// Misc imports
import { Component } from 'react';
import Cookies from 'js-cookie';

// Wrappers
import Header  from '../../../components/wrappers/header/index.jsx';
import Footer  from '../../../components/wrappers/footer/index.jsx';
// Components
import CookiePopup  from '../../../components/pages/landing/cookiePopup/index.jsx';
import ContactComponent from '../../../components/universal/contactCard/index.jsx';

// CSS
import '../../../App.css';

export default class Contact extends Component {
    constructor(props) {
      super(props)
      this.state = {
        acceptedCookieBool: Cookies.get('acceptedcookie'),
      };
    }
    
    render() {
        const acceptCookies = () => {
            this.setState({ acceptedCookieBool: 1 });
            Cookies.set('acceptedcookie', 1)
        }
        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh',
                    width: '100vw',
                    backgroundColor: '#fff',
                    overflowX: 'hidden',
                    marginTop: '5vh',
                }}
            >
                <Header />
                <div
                    className="primaryColor"
                    style={{
                        flexGrow: 1,
                        display: 'flex',
                        overflowY: 'auto',
                        overflowX: 'hidden',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        marginTop: '100px',
                    }}
                >
                    <ContactComponent />
                </div>
                <Footer />
                {
                    !this.state.acceptedCookieBool
                    ? <CookiePopup acceptCookies={acceptCookies} />
                    : null
                }
            </div>
        );
    }
}
