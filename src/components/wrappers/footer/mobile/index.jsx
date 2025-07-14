import { Component } from 'react';
import { Divider, Link, Box, Typography } from '@mui/material';
import NavigationContext from '../../../../context/navigation';
import formatStringFns from '../../../../utils/formatStringFns';

export default class Footer extends Component {
	static contextType = NavigationContext;

    render() {
        const { capitalize } = formatStringFns();
        const { xmlToJSON } = this.context;

        return (
            <Box
                sx={{
                    backgroundColor: 'var(--color-surface-alt)',
                    paddingY: 4,
                    paddingX: 2,
                    textAlign: 'center',
                    borderTop: '1px solid var(--color-border)',
                }}
            >
                <Box sx={{ 
                    marginBottom: 3, 
                    display: 'flex', 
                    height: '80px', 
                    overflow: 'hidden', 
                    alignItems: 'center',
                    gap: 2
                }}>
                    <a href='/' style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                        {/* DEV UPDATE MOVE TO CMS AS WELL OR ALLOW LOCAL IMAGE  */}
                        <img
                            src="/siteAssets/placeHolder.png"
                            alt="Company Name Logo"
                            style={{ width: '70px', height: 'auto' }}
                        />
                        <Typography 
                            variant="h5" 
                            sx={{ 
                                color: 'var(--color-text-secondary)', 
                                fontWeight: 'bold', 
                                marginLeft: '10px',
                                textTransform: 'uppercase',
                                fontSize: { xs: '1.2rem', md: '1.5rem' }
                            }}
                        >
                            {/* UPDATE */}
                            {'Company Name'}
                        </Typography>
                    </a>
                </Box>

                <Divider sx={{ marginBottom: 3 }} />
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'start',
                        flexWrap: 'wrap',
                        gap: 1,
                        marginBottom: 2,
                    }}
                >
                    {xmlToJSON.map((group, gIdx) => (
                        <Box
                            key={`group${gIdx}`}
                            className='primaryColor'
                            sx={{
                                textAlign: 'left',
                                minWidth: { xs: '110px', sm: '150px' },
                            }}
                        >
                            <Typography
                                variant="h6"
                                sx={{
                                    fontSize: '14px',
                                    fontWeight: 700,
                                    marginBottom: 1,
                                    color: 'var(--color-text-secondary)'
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
                                        color: 'var(--color-text-secondary)',
                                        fontSize: '12px',
                                        marginBottom: 0.5,
                                        '&:hover': { color: 'rgba(0,0,0,0.5)' },
                                    }}
                                >
                                    {capitalize(page.linklabel)}
                                </Link>
                            ))}
                        </Box>
                    ))}
                </Box>

                <Divider sx={{ marginBottom: 2 }} />
                <Box sx={{ marginBottom: 2, fontSize: '8pt' }}>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
                        {/* UPDATE */}
                        <Link href="mailto:placeholder@email.com" underline="none" sx={{ color: 'var(--color-text-secondary)', '&:hover': { color: 'rgba(0,0,0,0.5)' } }}>
                            placeholder@email.com
                        </Link>
                    </Box>
                </Box>

                <Divider sx={{ marginBottom: 2 }} />
                <Box sx={{ marginBottom: 2, fontSize: '8pt' }}>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
                        <Link href="/fulfillmentPolicy" underline="none" sx={{  color: 'var(--color-text-secondary)', '&:hover': { color: 'rgba(0,0,0,0.5)' } }}>
                            Fulfillment Policy
                        </Link>
                        <Typography>|</Typography>
                        <Link href="/privacypolicy" underline="none" sx={{  color: 'var(--color-text-secondary)', '&:hover': { color: 'rgba(0,0,0,0.5)' } }}>
                            Privacy Policy
                        </Link>
                        <Typography>|</Typography>
                        <Link href="/termsofuse" underline="none" sx={{  color: 'var(--color-text-secondary)', '&:hover': { color: 'rgba(0,0,0,0.5)' } }}>
                            Terms of Use
                        </Link>
                        <Typography>|</Typography>
                        <Link href="/sitemap.xml" underline="none" sx={{  color: 'var(--color-text-secondary)', '&:hover': { color: 'rgba(0,0,0,0.5)' } }}>
                            Site Map
                        </Link>
                    </Box>
                </Box>

                <Divider sx={{ marginBottom: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {/* UPDATE */}
                    <Typography sx={{ color: 'var(--color-text-secondary)' }} fontSize={11}>© {`${new Date().getFullYear()} Company Name`}</Typography>
                    <Typography sx={{ color: 'var(--color-text-secondary)' }} fontSize={11}>United States</Typography>
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
