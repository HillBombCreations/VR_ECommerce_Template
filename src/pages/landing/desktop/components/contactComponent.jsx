/* eslint-disable react/prop-types */
import { useState } from "react";
import { Box, Typography, TextField, Button, Alert, Snackbar, CircularProgress } from "@mui/material";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import axios from "axios";


const ContentWrapper = styled(Box)(() => ({
    width: "80%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: "20px",
}));

// Styled Components
const SectionWrapper = styled(Box)(() => ({
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingTop: "5vh",
    paddingBottom: '5vh',
    gap: "20px",
}));

const TextContainer = styled(Box)(() => ({
    display: "flex",
    flexDirection: 'column',
    alignItems: "start",
    justifyContent: "center",
    width: "50%",
    marginRight: '20px',
    minHeight: "50vh",
}));

const SectionTitle = styled(Typography)(() => ({
  fontSize: "2.5rem",
  fontWeight: "bold",
  color: "#3c4748",
  marginBottom: "2vh",
}));

const SectionSubtitle = styled(Typography)(() => ({
  fontSize: "1.2rem",
  color: "#5c5c5c",
  lineHeight: "1.6",
}));

const FormContainer = styled(Box)(() => ({
    display: "flex",
    flexDirection: 'column',
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
    minHeight: "50vh",
    gap: "2vh",
}));

const StyledTextField = styled(TextField)(() => ({
  width: "100%",
  "& .MuiInputBase-input": {
    color: "#333",
  },
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#fff",
    "& fieldset": { borderColor: "#5d8842" },
    "&:hover fieldset": { borderColor: "#497235" },
    "&.Mui-focused fieldset": { borderColor: "#5d8842" },
  },
  "& .MuiInputLabel-root": { color: "#5d8842" },
  "& .MuiInputLabel-root.Mui-focused": { color: "#5d8842" },
}));

const SubmitButton = styled(Button)(() => ({
  width: "100%",
  fontSize: "1rem",
  fontWeight: "bold",
  color: "#fff",
  background: "#5d8842",
  padding: "1.5vh 4vw",
  borderRadius: "50px",
  boxShadow: "0px 4px 10px rgba(93, 136, 66, 0.4)",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    background: "#497235",
    boxShadow: "0px 6px 20px rgba(93, 136, 66, 0.6)",
    transform: "translateY(-3px)",
  },
}));

const ContactSection = ({ contactSection }) => {
  const [formState, setFormState] = useState({ fullName: "", email: "", message: "" });
  const [alertMessage, setAlertMessage] = useState("");
  const [loadingContact, setLoadingContact] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [alertOpen, setAlertOpen] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;
  const key = import.meta.env.VITE_CLIENT_KEY;
  const contactEmail = import.meta.env.VITE_CONTACT_EMAIL;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const sendMessageToSlack = async () => {
    const { fullName, email, message } = formState;
    try {
        setLoadingContact(true);
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
            to: contactEmail,
            htmlInfo
        },
        {
            headers: {
                Authorization: key,
                "Content-Type": "application/json",
            },
        });

        if (response.status === 201) {
            // Update
            setAlertMessage("Successfully contacted Company Name! We will get back to you soon.");
            setAlertSeverity("success");
            setFormState({ fullName: "", email: "", message: "" });
        } else {
            setAlertMessage("Error sending message. Please try again.");
            setAlertSeverity("error");
        }
        setLoadingContact(false);
    } catch (error) {
        setAlertMessage("Network error. Please try again later.");
        setAlertSeverity("error");
    } finally {
        setAlertOpen(true);
    }
  };

  const handleAlertClose = () => setAlertOpen(false);

  return (
    <SectionWrapper>
        <ContentWrapper>
            <TextContainer>
                <SectionTitle>{contactSection.title}</SectionTitle>
                <SectionSubtitle>{contactSection.subtitle}</SectionSubtitle>
            </TextContainer>
            <FormContainer>
                <Snackbar
                open={alertOpen}
                autoHideDuration={6000}
                onClose={handleAlertClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                >
                <Alert
                    onClose={handleAlertClose}
                    severity={alertSeverity}
                    sx={{
                    width: "100%",
                    backgroundColor: alertSeverity === "success" ? "#4caf50" : "#f44336",
                    color: "#ffffff",
                    }}
                >
                    {alertMessage}
                </Alert>
                </Snackbar>

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
                    onClick={sendMessageToSlack}
                    disabled={!formState.fullName || !formState.email || !formState.message || loadingContact}
                >
                    {
                    loadingContact 
                    ?
                    <CircularProgress size={20} sx={{ color: "#fff" }} />
                    :
                    <>
                        {contactSection.buttonLabel}
                    </>
                    }
                </SubmitButton>
            </FormContainer>
        </ContentWrapper>
    </SectionWrapper>
  );
};

ContactSection.propTypes = {
  page: PropTypes.string,
};

export default ContactSection;