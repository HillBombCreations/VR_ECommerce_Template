import { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Unstable_TrapFocus, Fade, Paper, Stack, Box, Typography, Button
} from '@mui/material';

class CookiePopup extends Component {
    static propTypes = {
        acceptCookies: PropTypes.any,
    };
    constructor(props) {
        super(props)
        this.state = {
            bannerOpen: true,
        };
    }

    render() {
        const { acceptCookies } = this.props;
        const closeBanner = () => {
            acceptCookies();
            this.setState({ bannerOpen: false });
        };
        return (
            <div style={{ position: 'fixed', bottom: '90px', right: '90px', zIndex: 1500 }}>
                <>
                    <Unstable_TrapFocus open disableAutoFocus disableEnforceFocus>
                        <Fade appear={false} in={this.state.bannerOpen}>
                            <Paper
                              role="dialog"
                              aria-modal="false"
                              aria-label="Cookie banner"
                              square
                              variant="outlined"
                              tabIndex={-1}
                              sx={{
                                position: 'fixed',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                m: 0,
                                p: 2,
                                borderWidth: 0,
                                borderTopWidth: 1,
                              }}
                            >
                                <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" gap={2}>
                                    <Box sx={{ flexShrink: 1, alignSelf: { xs: 'flex-start', sm: 'center' }, textAlign: 'left' }}>
                                        <Typography fontWeight="bold">We use cookies</Typography>
                                        <Typography variant="body2">
                                            Cookies help us deliver the best experience on our website. By using our website, you agree to the use of cookies. <a href="/privacypolicy">Find out how we use cookies</a>.
                                        </Typography>
                                    </Box>
                                    <Stack gap={2} direction={{ xs: 'row-reverse', sm: 'row' }} sx={{ flexShrink: 0, alignSelf: { xs: 'flex-end', sm: 'center' } }}>
                                        <Button disableElevation className='primaryBackground' size="small" onClick={closeBanner} variant="contained">
                                            Accept
                                        </Button>
                                    </Stack>
                                </Stack>
                            </Paper>
                        </Fade>
                    </Unstable_TrapFocus>
                </>
            </div>
        );
    }
}
export default CookiePopup;
