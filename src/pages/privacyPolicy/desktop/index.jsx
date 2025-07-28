/* eslint-disable react/no-unescaped-entities */
import { useState, useContext } from "react";
import Cookies from "js-cookie";

// Wrappers
import Header from "../../../components/wrappers/header";
import Footer from "../../../components/wrappers/footer";
import FetchedDataContext from "../../../context/fetchedDataContext.jsx";
import CookiePopup from "../../../components/universal/cookiePopup.jsx";

// MUI Imports
import { Box, Typography, Container, Divider, Link } from "@mui/material";
import { styled } from "@mui/material/styles";

// Styled Components using CSS Variables
const PageContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  width: "100vw",
  overflowX: "hidden",
  backgroundColor: "var(--color-surface)",
}));

const ContentWrapper = styled(Container)(({ theme }) => ({
  flexGrow: 1,
  paddingTop: "80px",
  paddingBottom: "50px",
  color: "var(--color-text-primary)",
  maxWidth: "800px",
  textAlign: "left",
  transition: "var(--transition-base)",

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
  color: "var(--color-primary)",
  marginBottom: "15px",
}));

const SectionSubtitle = styled(Typography)(() => ({
  fontSize: "1.2rem",
  color: "var(--color-text-secondary)",
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
  color: "var(--color-text-primary)",
}));

const PrivacyPolicy = () => {
    const [acceptedCookieBool, setAcceptedCookieBool] = useState(Cookies.get("acceptedcookie"));
    const { businessInfo } = useContext(FetchedDataContext);
    const acceptCookies = () => {
        setAcceptedCookieBool(1);
        Cookies.set("acceptedcookie", 1);
    };


    return (
      <PageContainer>
        <Header />
        <ContentWrapper>
          <SectionTitle>Privacy Policy</SectionTitle>
          <SectionSubtitle>
            <strong>Effective Date:</strong> 07/28/2025
          </SectionSubtitle>

          <Typography>
            At <strong>{businessInfo?.name ? businessInfo.name : 'Comapany Name'}</strong>, we respect your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data when you visit our website or interact with our services.
          </Typography>

          <Divider sx={{ my: 3, backgroundColor: "var(--color-primary)" }} />

          <SectionTitle>1. Information We Collect</SectionTitle>
          <Typography>
            We may collect the following types of personal information:
          </Typography>
          <StyledList>
            <StyledListItem>
              <strong>Personal Information:</strong> Name, email, phone number, address, or other contact details provided by you.
            </StyledListItem>
            <StyledListItem>
              <strong>Payment Information:</strong> Billing data processed by secure third-party processors (e.g., Stripe, PayPal). We do not store card data.
            </StyledListItem>
            <StyledListItem>
              <strong>Order & Interaction History:</strong> Details about your purchases or account activity.
            </StyledListItem>
            <StyledListItem>
              <strong>Cookies & Analytics:</strong> Usage data including IP address, browser, device type, and navigation patterns.
            </StyledListItem>
          </StyledList>

          <SectionTitle>2. How We Use Your Information</SectionTitle>
          <StyledList>
            <StyledListItem>To fulfill orders and deliver requested products or services.</StyledListItem>
            <StyledListItem>To send you updates, offers, or newsletters if you opt-in.</StyledListItem>
            <StyledListItem>To improve website functionality and user experience through analytics.</StyledListItem>
            <StyledListItem>To detect, prevent, and respond to fraud or security issues.</StyledListItem>
            <StyledListItem>To comply with legal requirements or respond to lawful requests.</StyledListItem>
          </StyledList>

          <SectionTitle>3. How We Share Your Information</SectionTitle>
          <Typography>Your information is never sold. It may be shared with:</Typography>
          <StyledList>
            <StyledListItem>
              <strong>Service Providers:</strong> Including payment processors, email platforms, hosting services, and delivery partners.
            </StyledListItem>
            <StyledListItem>
              <strong>Legal Authorities:</strong> When required by law, subpoena, or investigation.
            </StyledListItem>
          </StyledList>

          <SectionTitle>4. Your Rights & Choices</SectionTitle>
          <Typography>You have the right to:</Typography>
          <StyledList>
            <StyledListItem>
              <strong>Access:</strong> Request a copy of the personal information we hold about you.
            </StyledListItem>
            <StyledListItem>
              <strong>Correction:</strong> Ask us to correct inaccurate or incomplete data.
            </StyledListItem>
            <StyledListItem>
              <strong>Deletion:</strong> Request removal of your information, subject to legal exceptions.
            </StyledListItem>
            <StyledListItem>
              <strong>Email Preferences:</strong> Opt-out of promotional emails using the unsubscribe link or by contacting us.
            </StyledListItem>
          </StyledList>

          <SectionTitle>5. Data Security</SectionTitle>
          <Typography>
            We implement reasonable technical and organizational measures to safeguard your data, including encryption, secure storage, and access controls.
          </Typography>

          <SectionTitle>6. Cookies & Tracking</SectionTitle>
          <Typography>
            We use cookies and similar technologies to improve your browsing experience, analyze site usage, and personalize content. You may adjust cookie settings through your browser.
          </Typography>

          <SectionTitle>7. Third-Party Links</SectionTitle>
          <Typography>
            Our site may contain links to external websites. We are not responsible for their content or privacy practices. Please review those sites' privacy policies.
          </Typography>

          <SectionTitle>8. Changes to This Policy</SectionTitle>
          <Typography>
            We may update this policy from time to time. Revisions will be posted on this page with an updated effective date.
          </Typography>

          <SectionTitle>9. Contact Us</SectionTitle>
          <Typography>If you have any questions, please contact us:</Typography>
          <StyledList>
            <StyledListItem>
                <strong>Email:</strong>{" "}
                <Link
                href={`mailto:${businessInfo.contactInfo.email}`}
                sx={{ color: "var(--color-secondary)", fontWeight: "bold" }}
                >
                {businessInfo.contactInfo.email}
                </Link>
            </StyledListItem>
            {
                businessInfo?.contactInfo?.phoneNumber && (
                    <StyledListItem>
                        <strong>Phone:</strong> {businessInfo.contactInfo.phoneNumber}
                    </StyledListItem>
                )
            }
            {
                businessInfo?.address?.street1 && (
                    <StyledListItem>
                        <strong>Business Address:</strong> {`${businessInfo.address.street1} ${businessInfo?.address?.street2 ? businessInfo?.address?.street2 : ''}, ${businessInfo.address.city}, ${businessInfo.address.state} ${businessInfo.address.zip}`}
                    </StyledListItem>
                )
            }
        </StyledList>
        </ContentWrapper>

        <Footer />
        {!acceptedCookieBool ? (
          <CookiePopup acceptCookies={acceptCookies} />
        ) : null}
      </PageContainer>
    );
}

export default PrivacyPolicy;