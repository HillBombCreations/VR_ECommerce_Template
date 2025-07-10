import { useState, useEffect, useContext } from 'react';
import { AppBar, Tabs, Tab, Toolbar, IconButton, Badge } from '@mui/material';
import { ShoppingCart, ExpandMore, ExpandLess } from '@mui/icons-material';
import { ClickAwayListener } from '@mui/base';
import NavigationContext from '../../../../context/navigation';
import CartContext from '../../../../context/cartContext'; 
import formatStringFns from '../../../../utils/formatStringFns';
import TransitionDialog from './transitionDialog';
import CartDialog from './cartDialog';

const Header = () => {
    const navigation = useContext(NavigationContext);
    const { cartItems, openCartMenu, setOpenCartMenu } = useContext(CartContext);
    const [pages, setPages] = useState([]);
    const [currentTab, setCurrentTab] = useState(false);
    const [open, setOpen] = useState(false);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const { capitalize } = formatStringFns();
        const mappedSections = navigation.xmlToJSON.map((section) => ({
            name: section.label,
            subSections: section.pages.map((page) => ({
                name: capitalize(page.linklabel),
                slug: page.path,
            })),
        }));
        setPages(mappedSections);
    }, [navigation]);

    useEffect(() => {
        let quantity = 0;
        if (Object.keys(cartItems).length > 0) {
            Object.entries(cartItems).forEach(([, value]) => {
                quantity += value.quantity
            })
        }
        setCartCount(quantity);
    }, [cartItems]);

    const handleTabClick = (tab) => {
        if (currentTab === tab) {
            setOpen(false);
            setCurrentTab(false);
        } else {
            setOpen(true);
            setCurrentTab(tab);
        }
    };

    return (
        <>
            
            <AppBar className='headerBG' sx={{ zIndex: 1 }} elevation={0}>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Toolbar sx={{ width: '100%' }}>
                        <a
                            style={{
                                display: 'flex',
                                cursor: 'pointer',
                                textDecoration: 'none',
                                height: '50px',
                                overflow: 'hidden',
                                alignItems: 'center',
                            }}
                            href='/'
                        >
                            <img src='/siteAssets/placeHolder.png' alt='Logo' style={{ width: '50px', height: 'auto' }} />
                        </a>
                        <ClickAwayListener onClickAway={() => { setOpen(false); setCurrentTab(false); }}>
                            <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '5vw', width: '60%' }}>
                                <Tabs
                                    value={currentTab ? currentTab.name : false}
                                    TabIndicatorProps={{ style: { backgroundColor: '#5d8842' } }}
                                    sx={{ '& button:hover': { borderBottom: '2px solid #5d8842', color: '#e8f5e9 !important' } }}
                                >
                                    {pages.map((page) => (
                                        <Tab
                                            key={page.name}
                                            value={page.name}
                                            label={page.name}
                                            icon={currentTab?.name === page.name ? <ExpandLess /> : <ExpandMore />}
                                            disableRipple
                                            iconPosition='end'
                                            onClick={() => handleTabClick(page)}
                                            sx={{ color: '#f3efd2 !important', marginX: '2vw' }}
                                        />
                                    ))}
                                </Tabs>
                            </div>
                        </ClickAwayListener>
                        <IconButton onClick={() => setOpenCartMenu(true)} sx={{ color: '#f3efd2', marginLeft: 'auto' }}>
                            <Badge badgeContent={cartCount} color="error">
                                <ShoppingCart />
                            </Badge>
                        </IconButton>
                    </Toolbar>
                </div>
            </AppBar>
            <TransitionDialog open={open} currentTab={currentTab} />
            <CartDialog open={openCartMenu} onClose={() => setOpenCartMenu(false)} />
        </>
    );
};

export default Header;