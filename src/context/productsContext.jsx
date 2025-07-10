import { createContext, useState, useEffect } from 'react';

const ProductsContext = createContext({
    products: null,
    setProducts: () => {},
});

// Create a custom hook to use the ProductsContext
export default ProductsContext;

// Create a provider component
export const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState(() => {
        const savedproducts = localStorage.getItem('products');
        return savedproducts ? JSON.parse(savedproducts) : null;
    });

    useEffect(() => {
        if (products) {
            localStorage.setItem('products', JSON.stringify(products));
        } else {
            localStorage.removeItem('products');
        }
    }, [products]);


    return (
        <ProductsContext.Provider value={{ products, setProducts }}>
            {children}
        </ProductsContext.Provider>
    );
};
