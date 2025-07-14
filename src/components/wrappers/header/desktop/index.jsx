import { useState, useEffect, useContext } from 'react';
import { AppBar, Tabs, Tab, Toolbar, IconButton, Badge } from '@mui/material';
import { ShoppingCart, ExpandMore, ExpandLess } from '@mui/icons-material';
import { ClickAwayListener } from '@mui/base';
import { styled } from "@mui/material/styles";
import NavigationContext from '../../../../context/navigation';
import CartContext from '../../../../context/cartContext'; 
import formatStringFns from '../../../../utils/formatStringFns';
import TransitionDialog from './transitionDialog';
import CartDialog from './cartDialog';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: "var(--color-primary)",
  boxShadow: "var(--shadow-medium)",
  zIndex: theme.zIndex.drawer + 1,
}));

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
        quantity += value.quantity;
      });
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
        <StyledAppBar elevation={0}>
            <div
                style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0 2rem',
                }}
            >
                <Toolbar sx={{ width: '100%', padding: 0 }}>
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
                    <img
                    src='/siteAssets/placeHolder.png'
                    alt='Logo'
                    style={{ width: '50px', height: 'auto' }}
                    />
                </a>
                <ClickAwayListener
                    onClickAway={() => {
                    setOpen(false);
                    setCurrentTab(false);
                    }}
                >
                    <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        marginLeft: '5vw',
                        width: '60%',
                    }}
                    >
                    <Tabs
                        value={currentTab ? currentTab.name : false}
                        TabIndicatorProps={{
                            style: { backgroundColor: 'var(--color-primary-hover)' },
                        }}
                        sx={{
                            '& .MuiTab-root:hover': {
                            borderBottom: '2px solid var(--color-primary-hover)',
                            color: 'var(--color-text-inverse)',
                            backgroundColor: 'transparent'
                            },
                        }}
                        >
                        {pages.map((page) => (
                            <Tab
                            key={page.name}
                            value={page.name}
                            label={page.name}
                            icon={
                                currentTab?.name === page.name ? (
                                <ExpandLess sx={{ color: 'var(--color-text-inverse)' }} />
                                ) : (
                                <ExpandMore sx={{ color: 'var(--color-text-inverse)' }} />
                                )
                            }
                            disableRipple
                            iconPosition="end"
                            onClick={() => handleTabClick(page)}
                            sx={{
                                color: 'var(--color-text-inverse)',
                                marginX: '2vw',
                                fontWeight: 'bold',
                                textTransform: 'none',
                                backgroundColor: 'transparent',
                                '&:hover': {
                                borderBottom: '2px solid var(--color-primary-hover)',
                                color: 'var(--color-text-inverse)',
                                backgroundColor: 'transparent',
                                },
                                '&.Mui-selected': {
                                color: 'var(--color-text-inverse)',
                                },
                                '&.Mui-focusVisible': {
                                backgroundColor: 'transparent',
                                },
                            }}
                            />
                        ))}
                        </Tabs>
                    </div>
                </ClickAwayListener>
                <IconButton
                    onClick={() => setOpenCartMenu(true)}
                    sx={{ color: 'var(--color-text-inverse)', marginLeft: 'auto' }}
                >
                    <Badge badgeContent={cartCount} color='error'>
                    <ShoppingCart />
                    </Badge>
                </IconButton>
                </Toolbar>
            </div>
        </StyledAppBar>
      <TransitionDialog open={open} currentTab={currentTab} />
      <CartDialog open={openCartMenu} onClose={() => setOpenCartMenu(false)} />
    </>
  );
};

export default Header;