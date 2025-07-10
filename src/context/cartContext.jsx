import { createContext, useState, useEffect } from 'react';

const CART_EXPIRATION_HOURS = 24;
const MILLISECONDS_IN_HOUR = 60 * 60 * 1000;

const CartContext = createContext({
	cartItems: {},
    openCartMenu: false,
    setOpenCartMenu: () => {},
    setCartItems: () => {},
});

export default CartContext;

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const savedCartItems = localStorage.getItem('cartItems');
        const savedTimestamp = localStorage.getItem('cartTimestamp');
        if (savedCartItems && savedTimestamp) {
            const timeElapsed = Date.now() - parseInt(savedTimestamp, 10);
            if (timeElapsed > CART_EXPIRATION_HOURS * MILLISECONDS_IN_HOUR) {
                localStorage.removeItem('cartItems');
                localStorage.removeItem('cartTimestamp');
                return {};
            }
            return JSON.parse(savedCartItems);
        }
        return {};
    });

    const [openCartMenu, setOpenCartMenu] =  useState(() => {
        const savedOpenCartMenu = localStorage.getItem('openCartMenu');
        return savedOpenCartMenu ? JSON.parse(savedOpenCartMenu) : false;
    });

    useEffect(() => {
        if (openCartMenu) {
            localStorage.setItem('openCartMenu', JSON.stringify(openCartMenu));
        } else {
            localStorage.removeItem('openCartMenu');
        }
    }, [openCartMenu]);

	useEffect(() => {
        if (cartItems) {
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            localStorage.setItem('cartTimestamp', Date.now().toString());
        } else {
            localStorage.removeItem('cartItems');
            localStorage.removeItem('cartTimestamp');
        }
    }, [cartItems]);


    return (
        <CartContext.Provider value={{ cartItems, setCartItems, openCartMenu, setOpenCartMenu }}>
            {children}
        </CartContext.Provider>
    );
};
