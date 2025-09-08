// MUI Imports
import { useState, useContext } from 'react';
import FetchedDataContext from '../../../../context/fetchedDataContext';
import { Box, Typography, TextField, Button, Alert, Snackbar } from '@mui/material';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import axios from 'axios';

// Styled Components
const ContactSection = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: theme.spacing(8, 10),
    gap: theme.spacing(4),
    textAlign: 'center',
}));

const SectionTitle = styled(Typography)(() => ({
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#3c4748',
    textAlign: 'center',
}));

const StyledTextField = styled(TextField)(() => ({
    width: '60%',
    '& .MuiInputBase-input': {
        color: '#333',
    },
    '& .MuiOutlinedInput-root': {
        backgroundColor: '#fff',
        '& fieldset': {
            borderColor: '#5d8842',
        },
        '&:hover fieldset': {
            borderColor: '#497235',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#5d8842',
        },
    },
    '& .MuiInputLabel-root': {
        color: '#5d8842',
    },
    '& .MuiInputLabel-root.Mui-focused': {
        color: '#5d8842',
    },
}));

const SubmitButton = styled(Button)(({ theme }) => ({
    width: '60%',
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#fff',
    background: '#5d8842',
    padding: theme.spacing(1.5, 4),
    borderRadius: '50px',
    boxShadow: '0px 4px 10px rgba(93, 136, 66, 0.4)',
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
        background: '#497235',
        boxShadow: '0px 6px 20px rgba(93, 136, 66, 0.6)',
        transform: 'translateY(-3px)',
    },
}));

const DesktopContactComponent = () => {
    const [formState, setFormState] = useState({
        fullName: '',
        email: '',
        message: '',
    });
    const { businessInfo } = useContext(FetchedDataContext);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success');
    const [alertOpen, setAlertOpen] = useState(false);
    const API_URL = 'https://client.vivreal.io';
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
            
            const htmlInfo = {
                title: `${businessInfo.name} Reachout`,
                subtitle: `Someone has contacted you,`,
                whiteBoxText: `Name: ${fullName}, Email: ${email} <br><br> ${message}`,
                signature: 'Thanks for choosing Vivreal.',
            };

            const response = await axios.post(
            `${API_URL}/tenant/sendContactEmail`,
            {
                name: fullName,
                message,
                siteName: businessInfo.name,
                to: businessInfo.contactInfo.email,
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
        <ContactSection>
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
                        color: '#ffffff' 
                    }}
                >
                    {alertMessage}
                </Alert>
            </Snackbar>
            <SectionTitle>Contact Us</SectionTitle>
            <Typography color="#333">
                Have questions or need more information? Fill out the form below and we’ll get back to you as soon as possible.
            </Typography>
            <Box display="flex" flexDirection="column" gap={4} alignItems="center" style={{ width: '100%' }}>
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
        </ContactSection>
    );
};

DesktopContactComponent.propTypes = {
    page: PropTypes.string,
};

export default DesktopContactComponent;