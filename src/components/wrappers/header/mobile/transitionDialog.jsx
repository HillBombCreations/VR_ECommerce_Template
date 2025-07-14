/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { styled } from "@mui/material/styles";
import { Dialog, Paper, Slide, IconButton, Divider, Box, Typography, Link } from '@mui/material';
import { Close, Home } from '@mui/icons-material';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="right" ref={ref} {...props} />;
});

const StyledPaper = styled(Paper)(() => ({
    backgroundColor: "var(--color-surface)",
    boxShadow: "var(--shadow-medium)",
    borderRadius: "var(--radius-base)",
    position: 'fixed',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
}));

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
            <StyledPaper
                sx={{
                    position: 'fixed',
                    backgroundColor: 'var(--color-text-inverse)',
                    left: 0,
                    top: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Box 
                    sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        padding: 2, 
                        backgroundColor: 'var(--color-text-inverse)' 
                    }}
                >
                    <IconButton 
                        aria-label="close" 
                        onClick={backToHome} 
                        sx={{
                            color: 'var(--color-primary)'
                        }}
                    >
                        <Home sx={{ fontSize: 28 }} />
                    </IconButton>
                    <IconButton 
                        aria-label="close" 
                        onClick={handleClose} 
                        sx={{
                            color: 'var(--color-primary)'
                        }}
                    >
                        <Close sx={{ fontSize: 28 }} />
                    </IconButton>
                </Box>
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
                                    color: 'var(--color-primary)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.8px',
                                    display: 'inline-block',
                                }}
                            >
                                {section.name}
                            </Typography>
                            <Divider sx={{ marginBottom: 2, marginTop: 1, backgroundColor: 'var(--color-primary)' }} />
                            {section.subSections.map((subPage, subIndex) => (
                                <Box
                                    key={`subPage-${subIndex}`}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        paddingY: 1.5,
                                        paddingX: 2,
                                        marginBottom: 1,
                                        backgroundColor: 'var(--color-primary)',
                                        borderRadius: '8px',
                                        boxShadow: 'var(--shadow-medium)',
                                        transition: 'all 0.3s ease',
                                    }}
                                >
                                    <Link
                                        href={subPage.slug}
                                        underline="none"
                                        sx={{
                                            fontSize: '14px',
                                            color: 'var(--color-text-inverse)',
                                            fontWeight: 500,
                                            flexGrow: 1,
                                            textDecoration: 'none',
                                        }}
                                    >
                                        {subPage.name}
                                    </Link>
                                    <Box
                                        sx={{
                                            color: 'var(--color-text-inverse)',
                                            fontSize: '14px',
                                            transition: 'all 0.3s ease',
                                        }}
                                    >
                                        →
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    ))}
                </Box>
            </StyledPaper>
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