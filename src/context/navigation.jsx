import { Component, createContext } from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

const NavigationContext = createContext({
    routes: [],
    xmlToJSON: [],
    setInitialLoadingData: () => {},
});

export default NavigationContext;

export class NavigationProvider extends Component {
    static propTypes = {
        children: PropTypes.any,
    };
    state = {
        routes: [],
        xmlToJSON: [],
        siteHeaders: [
            {
                label: 'Products',
                key: 'products',
                routesWithParams: {
                    products: { urlParameter: 'product' },
                }
            }
        ]
    };

    setInitialLoadingData = (urls, componentDictionary) => {
        const routerDictionary = {};

        const formattedJSON = this.state.siteHeaders.map(group => {
            routerDictionary[group.key] = group;

            group.pages = urls.filter(url => url.group === group.key);
            return group;
        });

        const routes = urls.map((url, urlIdx) => {
            const currentRouteList = [
                <Route
                    exact
                    key={`url_${urlIdx}`}
                    path={url.path}
                    Component={componentDictionary[url.component]}
                />
            ];

            if (routerDictionary[url.group]?.routesWithParams) {
                const urlInfo = routerDictionary[url.group].routesWithParams[url.component];
                
                if (urlInfo) {
                    const { urlParameter } = urlInfo;
                    currentRouteList.push(
                        <Route
                            exact
                            key={`url_${urlIdx}_withParam`}
                            path={`${urlParameter}/:id`}
                            Component={componentDictionary[`${urlParameter}Page`]}
                        />
                    );
                }
            }

            return currentRouteList;
        }).flat(2);
        this.setState({ routes, xmlToJSON: formattedJSON });
    };

    render() {
        const value = {
            routes: this.state.routes,
            xmlToJSON: this.state.xmlToJSON,
            setInitialLoadingData: this.setInitialLoadingData,
        };
        return (
            <NavigationContext.Provider value={value}>
                {this.props.children}
            </NavigationContext.Provider>
        );
    }
}