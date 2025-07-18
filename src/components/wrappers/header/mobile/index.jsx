import { useState, useEffect, useContext } from 'react';
import { AppBar, Toolbar, IconButton, Badge, Slide, Box } from '@mui/material';
import { Menu, ShoppingCart } from '@mui/icons-material';
import { styled } from "@mui/material/styles";
import NavigationContext from '../../../../context/navigation';
import CartContext from '../../../../context/cartContext';
import formatStringFns from '../../../../utils/formatStringFns';
import TransitionDialog from './transitionDialog';
import CartDialog from './cartDialog';
import FetchedDataContext from '../../../../context/fetchedDataContext';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: "var(--color-primary)",
  boxShadow: "var(--shadow-medium)",
  zIndex: theme.zIndex.drawer + 1,
  width: '100%',
  height: '60px'
}));

const MobileHeader = () => {
    const navigation = useContext(NavigationContext);
    const { siteLogo } = useContext(FetchedDataContext)
    const { cartItems, openCartMenu, setOpenCartMenu } = useContext(CartContext);
    const [pages, setPages] = useState([]);
    const [openMenu, setOpenMenu] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const [showMenu, setShowMenu] = useState(true);
    const [scrollTop, setScrollTop] = useState(0);

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

    const handleScroll = () => {
        const topDist = document.documentElement.scrollTop;
        if (window.pageYOffset === 0 || window.pageYOffset < 10) {
            setShowMenu(true);
            setScrollTop(topDist);
        } else if (scrollTop > topDist + 10) {
            setShowMenu(true);
            setScrollTop(topDist);
        } else if (scrollTop < topDist - 10) {
            setShowMenu(false);
            setScrollTop(topDist);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [scrollTop]);

    return (
        <>
            <Slide appear={true} direction="down" in={showMenu}>
                <StyledAppBar  position="fixed" elevation={0}>
                    <Toolbar
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingX: 2,
                        }}
                    >
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={() => setOpenMenu(true)}
                            sx={{ color: 'var(--color-surface)' }}
                        >
                            <Menu />
                        </IconButton>
                        <Box
                            component="a"
                            href="/"
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                textDecoration: 'none',
                                color: 'inherit',
                                height: '50px',
                                overflow: 'hidden',
                            }}
                        >
                            <img src={siteLogo} alt="DK Logo" style={{ width: '40px', height: 'auto' }} />
                        </Box>
                        <IconButton onClick={() => setOpenCartMenu(true)} sx={{ color: 'var(--color-surface)' }}>
                            <Badge badgeContent={cartCount} color="error">
                                <ShoppingCart />
                            </Badge>
                        </IconButton>
                    </Toolbar>
                </StyledAppBar>
            </Slide>
            <TransitionDialog pages={pages} open={openMenu} closeMenu={() => setOpenMenu(false)} />
            <CartDialog open={openCartMenu} onClose={() => setOpenCartMenu(false)} />
        </>
    );
};

export default MobileHeader;