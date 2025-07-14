import { Component } from 'react';
import { Divider, Box, Typography, Link, Grid } from '@mui/material';
import NavigationContext from '../../../../context/navigation';
import formatStringFns from '../../../../utils/formatStringFns';

export default class Footer extends Component {
    static contextType = NavigationContext;

    render() {
        const { capitalize } = formatStringFns();
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
                                src="/siteAssets/placeHolder.png"
                                alt="Company Name Icon Logo"
                                style={{ width: '60px', height: 'auto', marginBottom: '12px' }}
                            />
                        </a>
                        <Link
                            href="mailto:placeholder@email.com"
                            underline="none"
                            sx={{
                                fontSize: "10px",
                                color: 'var(--color-text-secondary)',
                                '&:hover': { color: 'var(--color-text-secondary)' }
                            }}
                        >
                            placeholder@email.com
                        </Link>
                    </Grid>

                    {this.context.xmlToJSON.map((group, gIdx) => (
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
                            © {`${new Date().getFullYear()} Company Name`}. All rights reserved.
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
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mt: 2,
                        gap: 1
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
            </Box>
        );
    }
}