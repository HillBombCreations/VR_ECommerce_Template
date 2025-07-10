// MUI Imports
import { Box, Typography, TextField, Button, Alert, Snackbar } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

// Styled Components

const ContactWrapper = styled(Box)(({ theme }) => ({
    width: '90%',
    marginX: 'auto',
    padding: '20px',
    border: '1px solid rgba(208, 173, 123, 0.5)',
    backgroundColor: 'rgba(255,255,255,0.05)',
    backdropFilter: 'blur(9px)',
    borderRadius: '20px',
    boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.5)',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
        width: '95%',
        padding: '15px',
    },
}));

const TitleWrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    textAlign: 'center',
    marginBottom: theme.spacing(2),
    gap: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
    },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#d0ad7b',
    flex: 1,
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
        fontSize: '1.5rem',
        textAlign: 'center',
    },
}));

const SubtitleWrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: theme.spacing(2),
    flexWrap: 'wrap',
    gap: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        alignItems: 'center',
    },
}));

const SectionSubtitle = styled(Typography)(({ theme }) => ({
    fontSize: '1rem',
    color: '#d0ad7b',
    textAlign: 'center',
    flex: 1,
    [theme.breakpoints.down('sm')]: {
        fontSize: '0.9rem',
    },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
    width: '100%',
    '& .MuiInputBase-input': {
        color: '#e0e0e0',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#d0ad7b',
        },
        '&:hover fieldset': {
            borderColor: '#b8916a',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#d0ad7b',
        },
    },
    '& .MuiInputLabel-root': {
        color: '#d0ad7b',
    },
    '& .MuiInputLabel-root.Mui-focused': {
        color: '#d0ad7b',
    },
    [theme.breakpoints.down('sm')]: {
        width: '100%',
    },
}));

const SubmitButton = styled(Button)(({ theme }) => ({
    width: '100%',
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#0d0d0d',
    background: 'linear-gradient(135deg, #d0ad7b 0%, #b8916a 100%)',
    padding: theme.spacing(1.5),
    borderRadius: theme.shape.borderRadius,
    boxShadow: '0px 4px 15px rgba(208, 173, 123, 0.3)',
    transition: 'all 0.4s ease-in-out',
    '&:hover': {
        background: 'linear-gradient(135deg, #b8916a 0%, #d0ad7b 100%)',
        boxShadow: '0px 8px 25px rgba(208, 173, 123, 0.6)',
        transform: 'translateY(-3px)',
    },
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(1),
    },
}));

const MobileContactComponent = ({ page }) => {
    const [formState, setFormState] = useState({
        fullName: '',
        email: '',
        message: '',
    });
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success');
    const [alertOpen, setAlertOpen] = useState(false);
    const API_URL = import.meta.env.VITE_API_URL;
    const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL;
    const KEY = import.meta.env.VITE_CLIENT_KEY;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const sendMessage = async () => {
        const { fullName, email, message } = formState;
        try {
            // UPDATE
            const htmlInfo = {
                title: "Company Name Reachout",
                subtitle: `Someone has contacted you,`,
                whiteBoxText: `Name: ${fullName}, Email: ${email} <br><br> ${message}`,
                signature: 'Thanks for choosing Vivreal.',
            };

            const response = await axios.post(
            `${API_URL}/tenant/sendContactEmail`,
            {
                name: fullName,
                message,
                to: CONTACT_EMAIL,
                htmlInfo
            },
            {
                headers: {
                    Authorization: KEY,
                    "Content-Type": "application/json",
                },
            });
            if (response.status === 200) {
                setAlertMessage('Successfully contacted! We will get back to you soon.');
                setAlertSeverity('success');
                setFormState({ fullName: '', email: '', message: '' });
            } else {
                setAlertMessage('Error sending message. Please try again.');
                setAlertSeverity('error');
            }
        } catch (error) {
            setAlertMessage('Network error. Please try again later.');
            setAlertSeverity('error');
        } finally {
            setAlertOpen(true);
        }
    };

    const handleAlertClose = () => {
        setAlertOpen(false);
    };

    return (
        <ContactWrapper page={page}>
            <Snackbar
                open={alertOpen}
                autoHideDuration={6000}
                onClose={handleAlertClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleAlertClose}
                    severity={alertSeverity}
                    sx={{
                        width: '100%',
                        backgroundColor: alertSeverity === 'success' ? '#4caf50' : '#f44336',
                        color: '#ffffff',
                    }}
                >
                    {alertMessage}
                </Alert>
            </Snackbar>
            <TitleWrapper>
                <SectionTitle>
                Reach Out
                </SectionTitle>
            </TitleWrapper>
            <SubtitleWrapper>
                <SectionSubtitle>
                    Please fill your contact details below
                </SectionSubtitle>
            </SubtitleWrapper>
            <Box display="flex" flexDirection="column" gap={4} alignItems="center" width="100%">
                <StyledTextField
                    name="fullName"
                    label="Full Name"
                    variant="outlined"
                    required
                    value={formState.fullName}
                    onChange={handleInputChange}
                />
                <StyledTextField
                    name="email"
                    label="Email"
                    variant="outlined"
                    type="email"
                    required
                    value={formState.email}
                    onChange={handleInputChange}
                />
                <StyledTextField
                    name="message"
                    label="Message"
                    variant="outlined"
                    multiline
                    rows={4}
                    required
                    value={formState.message}
                    onChange={handleInputChange}
                />
                <SubmitButton
                    onClick={sendMessage}
                    disabled={!formState.fullName || !formState.email || !formState.message}
                >
                    Send Message
                </SubmitButton>
            </Box>
        </ContactWrapper>
    );
};

MobileContactComponent.propTypes = {
    page: PropTypes.string,
};

export default MobileContactComponent;