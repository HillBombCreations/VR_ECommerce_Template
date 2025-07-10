/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Dialog, Paper, Slide, IconButton, Divider, Box, Typography, Link } from '@mui/material';
import { Close, Home } from '@mui/icons-material';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="right" ref={ref} {...props} />;
});

function TransitionDialog({ open, pages, closeMenu }) {
    const [drawerOpen, setDrawerOpen] = useState(open);

    useEffect(() => {
        setDrawerOpen(open);
    }, [open]);

    const backToHome = () => {
        window.location.replace('/');
    };

    const handleClose = () => {
        closeMenu();
    };

    return (
        <Dialog
            open={drawerOpen}
            TransitionComponent={Transition}
            transitionDuration={400}
            onClose={handleClose}
            hideBackdrop
            disableScrollLock
        >
            <Paper
                sx={{
                    position: 'fixed',
                    backgroundColor: '#fff',
                    left: 0,
                    top: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {/* Close Button */}
                <Box 
                    sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        padding: 2, 
                        backgroundColor: '#fff' 
                    }}
                >
                    <IconButton 
                        aria-label="close" 
                        onClick={backToHome} 
                        sx={{
                            color: '#5d8842',
                            '&:hover': { color: '#d0ad7b' },
                        }}
                    >
                        <Home sx={{ fontSize: 28 }} />
                    </IconButton>
                    <IconButton 
                        aria-label="close" 
                        onClick={handleClose} 
                        sx={{
                            color: '#5d8842',
                            '&:hover': { color: '#d0ad7b' },
                        }}
                    >
                        <Close sx={{ fontSize: 28 }} />
                    </IconButton>
                </Box>

                {/* Navigation Links */}
                <Box sx={{ flex: 1, overflowY: 'auto', padding: 2, height: '85vh' }}>
                    {pages.map((section, index) => (
                        <Box
                            key={`section-${index}`}
                            sx={{
                                marginBottom: 3,
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                borderRadius: '8px',
                                padding: 2,
                            }}
                        >
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 700,
                                    fontSize: '16px',
                                    color: '#5d8842',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.8px',
                                    display: 'inline-block',
                                }}
                            >
                                {section.name}
                            </Typography>
                            <Divider sx={{ marginBottom: 2, marginTop: 1, backgroundColor: '#5d8842' }} />
                            {section.subSections.map((subPage, subIndex) => (
                                <Box
                                    key={`subPage-${subIndex}`}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        paddingY: 1.5,
                                        paddingX: 2,
                                        marginBottom: 1,
                                        backgroundColor: '#5d8842',
                                        borderRadius: '8px',
                                        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                                            transform: 'translateY(-2px)',
                                        },
                                    }}
                                >
                                    <Link
                                        href={subPage.slug}
                                        underline="none"
                                        sx={{
                                            fontSize: '14px',
                                            color: '#fff',
                                            fontWeight: 500,
                                            flexGrow: 1,
                                            textDecoration: 'none',
                                            '&:hover': {
                                                color: 'rgba(0,0,0,0.5)',
                                            },
                                        }}
                                    >
                                        {subPage.name}
                                    </Link>
                                    <Box
                                        sx={{
                                            color: '#fff',
                                            fontSize: '14px',
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                color: 'rgba(0,0,0,0.5)',
                                            },
                                        }}
                                    >
                                        →
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    ))}
                </Box>
            </Paper>
        </Dialog>
    );
}

TransitionDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    pages: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            subSections: PropTypes.arrayOf(
                PropTypes.shape({
                    name: PropTypes.string.isRequired,
                    slug: PropTypes.string.isRequired,
                })
            ).isRequired,
        })
    ).isRequired,
    closeMenu: PropTypes.func.isRequired,
};

export default TransitionDialog;