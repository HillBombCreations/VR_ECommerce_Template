import { useState, useEffect, useRef, useContext } from 'react';
import { Snackbar, Alert } from '@mui/material';
import CartContext from '../../../context/cartContext';
import PropTypes from 'prop-types';

const AUTO_HIDE_DURATION = 2500;

export default function AddedToCartSnackBar({ itemAdded, setItemAdded }) {
    const [open, setOpen] = useState(false);
    const [count, setCount] = useState(0);
    const { cartItems } = useContext(CartContext);
    const timerRef = useRef(null);
    useEffect(() => {
        if (itemAdded && Object.keys(cartItems)?.length) {
            setCount((prev) => prev + 1);
            setOpen(true);

            if (timerRef.current) clearTimeout(timerRef.current);

            timerRef.current = setTimeout(() => {
                setOpen(false);
                setItemAdded(false);
                setCount(0);
            }, AUTO_HIDE_DURATION);
        }
    }, [cartItems]);

    return (
        <Snackbar
            open={open}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
            <Alert
                severity="success"
                icon={false}
                sx={{
                    backgroundColor: 'var(--color-text-primary)',
                    color: 'var(--color-text-inverse)',
                    fontWeight: 'bold',
                    padding: '12px 24px',
                    borderRadius: '10px',
                    boxShadow: '0px 4px 12px var(--shadow-medium)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                }}
            >
                Item Added to Cart{count > 1 ? ` (${count})` : ''}
            </Alert>
        </Snackbar>
    );
}

AddedToCartSnackBar.propTypes = {
    itemAdded: PropTypes.bool.isRequired,
    setItemAdded: PropTypes.func,
};