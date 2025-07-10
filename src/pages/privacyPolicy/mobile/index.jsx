/* eslint-disable react/no-unescaped-entities */
import { Component } from "react";
import Cookies from "js-cookie";

// Wrappers
import Header from "../../../components/wrappers/header/index.jsx";
import Footer from "../../../components/wrappers/footer/index.jsx";
import CookiePopup from "../../../components/pages/landing/cookiePopup/index.jsx";

// MUI Imports
import { Box, Typography, Container, Divider, Link } from "@mui/material";
import { styled } from "@mui/material/styles";

// Styled Components
const PageContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  width: "100vw",
  overflowX: "hidden",
  backgroundColor: "#fff",
}));

const ContentWrapper = styled(Container)(({ theme }) => ({
  flexGrow: 1,
  paddingTop: "80px",
  paddingBottom: "50px",
  color: "#3c4748",
  maxWidth: "800px",
  textAlign: "left",

  [theme.breakpoints.down("sm")]: {
    paddingTop: "60px",
    paddingBottom: "30px",
    paddingLeft: "15px",
    paddingRight: "15px",
  },
}));

const SectionTitle = styled(Typography)(() => ({
  fontSize: "2rem",
  fontWeight: "bold",
  color: "#5d8842",
  marginBottom: "15px",
}));

const SectionSubtitle = styled(Typography)(() => ({
  fontSize: "1.2rem",
  color: "#3c4748",
  marginBottom: "15px",
}));

const StyledList = styled("ul")(() => ({
  paddingLeft: "20px",
  marginBottom: "20px",
}));

const StyledListItem = styled("li")(() => ({
  fontSize: "1rem",
  lineHeight: "1.5",
  marginBottom: "10px",
  color: "#3c4748",
}));

export default class PrivacyPolicy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      acceptedCookieBool: Cookies.get("acceptedcookie"),
    };
  }

  render() {
    const acceptCookies = () => {
      this.setState({ acceptedCookieBool: 1 });
      Cookies.set("acceptedcookie", 1);
    };

    return (
      <PageContainer>
        <Header />
        <ContentWrapper>
          <SectionTitle>Privacy Policy</SectionTitle>
          <SectionSubtitle>
            {/* UPDATE */}
            <strong>Effective Date:</strong> MM/DD/YYYY
          </SectionSubtitle>

          <Typography>
            {/* UPDATE Company Name */}
            At <strong>[Your Company Name]</strong>, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and protect your information when you visit our website or use our services.
          </Typography>

          <Divider sx={{ my: 3, backgroundColor: "#5d8842" }} />

          <SectionTitle>1. Information We Collect</SectionTitle>
          <Typography>
            We may collect the following types of personal information when you interact with our website:
          </Typography>
          <StyledList>
            <StyledListItem>
              <strong>Personal Information:</strong> Name, email address, phone number, and billing/shipping address.
            </StyledListItem>
            <StyledListItem>
              <strong>Payment Information:</strong> Details securely processed by third-party providers (e.g., Stripe, PayPal). We do not store payment info.
            </StyledListItem>
            <StyledListItem>
              <strong>Order & Purchase History:</strong> Information about your past purchases and preferences.
            </StyledListItem>
            <StyledListItem>
              <strong>Cookies & Analytics:</strong> Browser data including IP address, device type, and on-site behavior.
            </StyledListItem>
          </StyledList>

          <SectionTitle>2. How We Use Your Information</SectionTitle>
          <StyledList>
            <StyledListItem>To fulfill and manage orders or requests.</StyledListItem>
            <StyledListItem>To personalize user experience and recommend content.</StyledListItem>
            <StyledListItem>To send promotional updates if you've opted in.</StyledListItem>
            <StyledListItem>To analyze site traffic and performance.</StyledListItem>
            <StyledListItem>To comply with legal obligations and security checks.</StyledListItem>
          </StyledList>

          <SectionTitle>3. How We Share Your Information</SectionTitle>
          <Typography>
            We never sell your data. We may share it with:
          </Typography>
          <StyledList>
            <StyledListItem>
              <strong>Service Providers:</strong> Payment gateways, shipping providers, and marketing platforms.
            </StyledListItem>
            <StyledListItem>
              <strong>Authorities:</strong> In response to lawful requests or to prevent fraud.
            </StyledListItem>
          </StyledList>

          <SectionTitle>4. Your Rights & Choices</SectionTitle>
          <Typography>You may have the right to:</Typography>
          <StyledList>
            <StyledListItem>
              <strong>Access:</strong> Request a copy of your personal data.
            </StyledListItem>
            <StyledListItem>
              <strong>Correction:</strong> Ask us to fix or update your info.
            </StyledListItem>
            <StyledListItem>
              <strong>Deletion:</strong> Request deletion of your data, where legally possible.
            </StyledListItem>
            <StyledListItem>
              <strong>Marketing Preferences:</strong> Opt out of promotional emails via unsubscribe links.
            </StyledListItem>
          </StyledList>

          <SectionTitle>5. Data Security</SectionTitle>
          <Typography>
            We use secure technologies and best practices to keep your data safe, including SSL encryption and PCI-compliant processing.
          </Typography>

          <SectionTitle>6. Cookies & Tracking</SectionTitle>
          <Typography>
            Cookies help improve your experience and enable site analytics. You can adjust cookie preferences via your browser settings.
          </Typography>

          <SectionTitle>7. Third-Party Links</SectionTitle>
          <Typography>
            This website may contain links to external services. We are not responsible for their privacy practices or content.
          </Typography>

          <SectionTitle>8. Updates to This Policy</SectionTitle>
          <Typography>
            We may revise this Privacy Policy from time to time. Updates will be posted here with a new effective date.
          </Typography>

          <SectionTitle>9. Contact Us</SectionTitle>
          <Typography>If you have any questions or concerns, feel free to reach out:</Typography>
          <StyledList>
            <StyledListItem>
              {/* UPDATE */}
              <strong>Email:</strong>{" "}
              <Link href="mailto:email@example.com" sx={{ color: "#5d8842", fontWeight: "bold" }}>
                email@example.com
              </Link>
            </StyledListItem>
            {/* UPDATE */}
            <StyledListItem><strong>Phone:</strong> (000) 000-0000</StyledListItem>
            {/* UPDATE */}
            <StyledListItem><strong>Address:</strong> 1234 Main Street, City, State ZIP</StyledListItem>
          </StyledList>
        </ContentWrapper>

        <Footer />
        {!this.state.acceptedCookieBool ? <CookiePopup acceptCookies={acceptCookies} /> : null}
      </PageContainer>
    );
  }
}