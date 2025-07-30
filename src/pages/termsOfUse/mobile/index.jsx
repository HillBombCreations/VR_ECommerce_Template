/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from "react";
import FetchedDataContext from "../../../context/fetchedDataContext.jsx";
import Cookies from "js-cookie";

// Wrappers
import Header from "../../../components/wrappers/header/index.jsx";
import Footer from "../../../components/wrappers/footer/index.jsx";
import CookiePopup from "../../../components/universal/cookiePopup.jsx";
import formatStringFns from "../../../utils/formatStringFns.jsx";

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
  backgroundColor: "var(--color-surface)",
}));

const ContentWrapper = styled(Container)(() => ({
  flexGrow: 1,
  paddingTop: "80px",
  paddingBottom: "50px",
  color: "var(--color-text-primary)",
  maxWidth: "800px",
  textAlign: "left",
  paddingLeft: "15px",
  paddingRight: "15px",
}));

const SectionTitle = styled(Typography)(() => ({
  fontSize: "2rem",
  fontWeight: "bold",
  color: "var(--color-primary)",
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

const TermsOfUse = () => {
  const [acceptedCookieBool, setAcceptedCookieBool] = useState(Cookies.get("acceptedcookie"));
  const { businessInfo } = useContext(FetchedDataContext);
  const { formatPhoneNumber } = formatStringFns();
  const acceptCookies = () => {
      setAcceptedCookieBool(1);
      Cookies.set("acceptedcookie", 1);
  };

    return (
      <PageContainer>
        <Header />
        <ContentWrapper>
          <SectionTitle>Terms of Use</SectionTitle>
          <Typography>
            <strong>Effective Date:</strong> 07/28/2025
          </Typography>

          <Divider sx={{ my: 3, backgroundColor: "var(--color-primary)" }} />

          <SectionTitle>1. Acceptance of Terms</SectionTitle>
          <Typography>
            By accessing or using the website and services of <strong>{businessInfo?.name ? businessInfo.name : 'Comapany Name'}</strong> ("we," "us," or "our"), you agree to abide by these Terms of Use. If you do not agree, please do not use our website.
          </Typography>

          <SectionTitle>2. Description of Services</SectionTitle>
          <Typography>
            We offer a range of products and/or services, which may include but are not limited to:
          </Typography>
          <StyledList>
            <StyledListItem>Custom goods, digital products, or professional services.</StyledListItem>
            <StyledListItem>Content, tools, or software for individual or business use.</StyledListItem>
            <StyledListItem>Online ordering, support, or consulting services.</StyledListItem>
          </StyledList>
          <Typography>
            Product and service availability may vary and is subject to change.
          </Typography>

          <SectionTitle>3. User Responsibilities</SectionTitle>
          <Typography>When using our website or services, you agree to:</Typography>
          <StyledList>
            <StyledListItem>Provide accurate and current information.</StyledListItem>
            <StyledListItem>Use our site in compliance with all applicable laws.</StyledListItem>
            <StyledListItem>Refrain from abusing, hacking, or interfering with our platform.</StyledListItem>
          </StyledList>

          <SectionTitle>4. Intellectual Property</SectionTitle>
          <Typography>
            All content, including trademarks, logos, text, images, and software, is the property of <strong>{businessInfo?.name ? businessInfo.name : 'Comapany Name'}</strong> or its licensors. You may not copy or distribute our content without prior written consent.
          </Typography>

          <SectionTitle>5. Pricing & Payments</SectionTitle>
          <Typography>
            Prices are listed in <strong>USD</strong> and may change without notice. Payments are securely processed via third-party providers. We do not store credit card or payment details.
          </Typography>

          <SectionTitle>6. Shipping, Delivery, or Pickup</SectionTitle>
          <Typography>
            We may offer shipping, delivery, or local pickup depending on your location and order type. Details will be provided during checkout or via confirmation email.
          </Typography>

          <SectionTitle>7. Refund & Return Policy</SectionTitle>
          <Typography>
            We stand behind our products and services. For refund or return eligibility, please contact us at <strong>{businessInfo.contactInfo.email}</strong> within <strong>14 Days</strong> of receiving your order.
          </Typography>

          <SectionTitle>8. Limitation of Liability</SectionTitle>
          <Typography>
            <strong>{businessInfo?.name ? businessInfo.name : 'Comapany Name'}</strong> is not liable for indirect, incidental, or consequential damages arising from your use of our site or services.
          </Typography>

          <SectionTitle>9. Termination</SectionTitle>
          <Typography>
            We reserve the right to suspend or terminate your access to our services if you violate these Terms of Use.
          </Typography>

          <SectionTitle>10. Governing Law</SectionTitle>
          <Typography>
            These Terms shall be governed by the laws of the jurisdiction in which <strong>{businessInfo?.name ? businessInfo.name : 'Comapany Name'}</strong> operates.
          </Typography>

          <SectionTitle>11. Updates to Terms</SectionTitle>
          <Typography>
            We may modify these Terms of Use at any time. Continued use of our site after changes indicates your acceptance of the updated terms.
          </Typography>

          <SectionTitle>12. Contact Us</SectionTitle>
          <Typography>If you have any questions, please contact us:</Typography>
          <StyledList>
            <StyledListItem>
              <strong>Email:</strong>{" "}
              <Link href={`mailto:${businessInfo.contactInfo.email}`} sx={{ color: "var(--color-primary)", fontWeight: "bold" }}>
                {businessInfo.contactInfo.email}
              </Link>
            </StyledListItem>
            {
                businessInfo?.contactInfo?.phoneNumber && (
                     <StyledListItem>
                        <strong>Phone:</strong> {formatPhoneNumber(businessInfo.contactInfo.phoneNumber)}
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
        {!acceptedCookieBool ? <CookiePopup acceptCookies={acceptCookies} /> : null}
      </PageContainer>
    );
};

export default TermsOfUse;