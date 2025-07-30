import { useContext } from 'react';
import { Divider, Link, Box, Typography } from '@mui/material';
import NavigationContext from '../../../../context/navigation';
import formatStringFns from '../../../../utils/formatStringFns';
import FetchedDataContext from '../../../../context/fetchedDataContext';

const Footer = () => {
	const navigation = useContext(NavigationContext);
    const { siteLogo, businessInfo } = useContext(FetchedDataContext);
    const { capitalize, formatPhoneNumber } = formatStringFns();

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
                    <img
                        src={siteLogo}
                        alt={`${businessInfo?.name ? businessInfo.name : 'Comapany Name'} Logo`}
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
                        {businessInfo?.name ? businessInfo.name : 'Comapany Name'}
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
                {navigation.xmlToJSON.map((group, gIdx) => (
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
                <Box
                    sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 0.5,
                    textAlign: 'center',
                    }}
                >
                    {businessInfo?.contactInfo?.email && (
                    <Link
                        href={`mailto:${businessInfo.contactInfo.email}`}
                        underline="none"
                        sx={{
                        color: 'var(--color-text-secondary)',
                        '&:hover': { color: 'rgba(0,0,0,0.5)' },
                        fontSize: '10px',
                        }}
                    >
                        {businessInfo.contactInfo.email}
                    </Link>
                    )}

                    {businessInfo?.contactInfo?.phoneNumber && (
                    <Link
                        href={`tel:${businessInfo.contactInfo.phoneNumber}`}
                        underline="none"
                        sx={{
                        color: 'var(--color-text-secondary)',
                        '&:hover': { color: 'rgba(0,0,0,0.5)' },
                        fontSize: '10px',
                        }}
                    >
                        {formatPhoneNumber(businessInfo.contactInfo.phoneNumber)}
                    </Link>
                    )}

                    {businessInfo?.address?.street1 && (
                    <Typography
                        component="div"
                        sx={{
                        fontSize: '10px',
                        color: 'var(--color-text-secondary)',
                        }}
                    >
                        {`${businessInfo.address.street1} ${businessInfo.address.street2 || ''}, ${businessInfo.address.city}, ${businessInfo.address.state} ${businessInfo.address.zip}`}
                    </Typography>
                    )}
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
                <Typography sx={{ color: 'var(--color-text-secondary)' }} fontSize={11}>© {`${new Date().getFullYear()} ${businessInfo?.name ? businessInfo.name : 'Comapany Name'}`}</Typography>
                <Typography sx={{ color: 'var(--color-text-secondary)' }} fontSize={11}>United States</Typography>
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
            </a>
        </Box>
    );
};

export default Footer;