import { useContext } from 'react';
import { Divider, Box, Typography, Link, Grid } from '@mui/material';
import formatStringFns from '../../../../utils/formatStringFns';
import NavigationContext from '../../../../context/navigation';
import FetchedDataContext from '../../../../context/fetchedDataContext';

const Footer = () => {
    const { siteLogo, businessInfo } = useContext(FetchedDataContext);
    const { capitalize } = formatStringFns();
    const navigation = useContext(NavigationContext);
    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: 'var(--color-surface-alt)',
                marginTop: 'auto',
                paddingY: 2,
                paddingX: 1,
                borderTop: '1px solid var(--color-border)',
            }}
        >
            <Grid
                container
                spacing={2}
                sx={{
                    maxWidth: '1000px',
                    margin: '0 auto',
                    justifyContent: 'flex-start',
                }}
            >
                <Grid
                    item
                    xs={12}
                    sm={3}
                    sx={{
                        textAlign: { xs: 'center', sm: 'left' },
                        display: 'flex',
                        flexDirection: 'column',
                        fontSize: '10px'
                    }}
                >
                    <a href='/' style={{ display: 'flex', overflow: 'hidden', alignItems: 'center' }}>
                        <img
                            src={siteLogo}
                            alt={`${businessInfo?.name ? businessInfo.name : 'Comapany Name'} Logo`}
                            style={{ width: '60px', height: 'auto', marginBottom: '12px' }}
                        />
                    </a>
                    <Link
                        href={`"mailto:${businessInfo.contactInfo.email}`}
                        underline="none"
                        sx={{
                            fontSize: "10px",
                            color: 'var(--color-text-secondary)',
                            '&:hover': { color: 'var(--color-text-secondary)' }
                        }}
                    >
                        {businessInfo.contactInfo.email}
                    </Link>
                </Grid>

                {navigation.xmlToJSON.map((group, gIdx) => (
                    <Grid
                        item
                        xs={6}
                        sm={2}
                        key={`group${gIdx}`}
                        className='primaryColor'
                        sx={{ textAlign: { xs: 'center', sm: 'left' } }}
                    >
                        <Typography
                            sx={{
                                fontSize: '14px',
                                color: 'var(--color-text-secondary)',
                                fontWeight: 700,
                                marginBottom: 1
                            }}
                        >
                            {group.label}
                        </Typography>
                        {group.pages.map((page, pIdx) => (
                            <Link
                                key={`page_${pIdx}`}
                                href={page.path}
                                underline="none"
                                sx={{
                                    display: 'block',
                                    fontSize: '10px',
                                    marginBottom: 0.5,
                                    color: 'var(--color-text-secondary)',
                                    '&:hover': {
                                        color: 'var(--color-text-secondary)'
                                    },
                                }}
                            >
                                {capitalize(page.linklabel)}
                            </Link>
                        ))}
                    </Grid>
                ))}
            </Grid>

            <Divider sx={{ marginY: 3 }} />

            <Box
                className='primaryColor'
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    maxWidth: '1000px',
                    margin: '0 auto',
                    fontSize: '10px',
                    color: 'var(--color-text-muted)',
                    textAlign: { xs: 'center', sm: 'left' },
                    gap: 1,
                }}
            >
                <Box
                    sx={{
                        marginBottom: { xs: 1, sm: 0 },
                        textAlign: { xs: 'center', sm: 'left' }
                    }}
                >
                    <Typography
                        sx={{ color: 'var(--color-text-secondary)' }}
                        fontSize={10}
                    >
                        © {`${new Date().getFullYear()} ${businessInfo?.name ? businessInfo.name : 'Comapany Name'}`}. All rights reserved.
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <Link
                        href="/fulfillmentPolicy"
                        underline="none"
                        sx={{
                            fontSize: '10px',
                            color: 'var(--color-text-secondary)',
                            '&:hover': {
                                color: 'var(--color-text-muted)'
                            }
                        }}
                    >
                        Fulfillment Policy
                    </Link>
                    <Typography sx={{ color: 'var(--color-text-secondary)', fontSize: '10px' }}>|</Typography>
                    <Link
                        href="/privacypolicy"
                        underline="none"
                        sx={{
                            fontSize: '10px',
                            color: 'var(--color-text-secondary)',
                            '&:hover': {
                                color: 'var(--color-text-muted)'
                            }
                        }}
                    >
                        Privacy Policy
                    </Link>
                    <Typography sx={{ color: 'var(--color-text-secondary)', fontSize: '10px' }}>|</Typography>
                    <Link
                        href="/termsofuse"
                        underline="none"
                        sx={{
                            fontSize: '10px',
                            color: 'var(--color-text-secondary)',
                            '&:hover': {
                                color: 'var(--color-text-muted)'
                            }
                        }}
                    >
                        Terms of Use
                    </Link>
                    <Typography sx={{ color: 'var(--color-text-secondary)', fontSize: '10px' }}>|</Typography>
                    <Link
                        href="/sitemap"
                        underline="none"
                        sx={{
                            fontSize: '10px',
                            color: 'var(--color-text-secondary)',
                            '&:hover': {
                                color: 'var(--color-text-muted)'
                            }
                        }}
                    >
                        Site Map
                    </Link>
                </Box>

                <Typography
                    sx={{ color: 'var(--color-text-secondary)' }}
                    fontSize={10}
                >
                    United States
                </Typography>
            </Box>
            <a
                href="https://vivreal.io"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
            >
                <Box
                    sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mt: 2,
                    gap: 1,
                    cursor: 'pointer'
                    }}
                >
                    <img
                    src="/siteAssets/placeHolder.png"
                    alt="Vivreal Logo"
                    style={{ width: '16px', height: '16px' }}
                    />
                    <Typography sx={{ fontSize: '10px', color: 'var(--color-text-secondary)' }}>
                    Powered by Vivreal
                    </Typography>
                </Box>
            </a>
        </Box>
    );
};

export default Footer;