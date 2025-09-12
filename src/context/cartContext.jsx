/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from 'react';
import {
  getFromDB,
  setToDB,
  removeFromDB,
  clearDB
} from '../utils/indexedDB';

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
    const [cartItems, setCartItems] = useState({});
    const [openCartMenu, setOpenCartMenu] = useState(false);
    const [cartHydrated, setCartHydrated] = useState(false);

    useEffect(() => {
        async function loadCartFromDB() {
            const savedCartItems = await getFromDB('cartItems');
            const savedTimestamp = await getFromDB('cartTimestamp');
            const savedOpenCartMenu = await getFromDB('openCartMenu');

            if (savedCartItems && savedTimestamp) {
                const timeElapsed = Date.now() - parseInt(savedTimestamp, 10);
                if (timeElapsed > CART_EXPIRATION_HOURS * MILLISECONDS_IN_HOUR) {
                    await clearDB();
                    setCartItems({});
                    setOpenCartMenu(false);
                } else {
                    setCartItems(savedCartItems);
                    setOpenCartMenu(savedOpenCartMenu || false);
                }
            }

            setCartHydrated(true);
        }

        loadCartFromDB();
    }, []);

    useEffect(() => {
        if (openCartMenu !== null) {
            setToDB('openCartMenu', openCartMenu);
        }
    }, [openCartMenu]);

	useEffect(() => {
        if (!cartHydrated) return; 
        if (Object.keys(cartItems).length) {
            setToDB('cartItems', cartItems);
            setToDB('cartTimestamp', Date.now().toString());
        } else {
            removeFromDB('cartItems');
            removeFromDB('cartTimestamp');
        }
    }, [cartItems]);


    return (
        <CartContext.Provider value={{ cartItems, setCartItems, openCartMenu, setOpenCartMenu }}>
            {children}
        </CartContext.Provider>
    );
};
