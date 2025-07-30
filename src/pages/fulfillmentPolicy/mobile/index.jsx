/* eslint-disable react/no-unescaped-entities */
import { useState, useContext } from "react";
import Cookies from "js-cookie";
import FetchedDataContext from "../../../context/fetchedDataContext.jsx";
import formatStringFns from "../../../utils/formatStringFns.jsx";

// Wrappers
import Header from "../../../components/wrappers/header";
import Footer from "../../../components/wrappers/footer";
import CookiePopup from "../../../components/universal/cookiePopup.jsx";

// MUI
import { Box, Typography, Container, Divider, Link } from "@mui/material";
import { styled } from "@mui/material/styles";

// Styled Components using CSS variables
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
  color: "var(--color-text-primary)",
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

const FulfillmentPolicy = () => {
  const [acceptedCookieBool, setAcceptedCookieBool] = useState(false);
  const { businessInfo } = useContext(FetchedDataContext);
  const { formatPhoneNumber } = formatStringFns();

  const acceptCookies = () => {
    setAcceptedCookieBool(true);
    Cookies.set("acceptedcookie", 1);
  };

  return (
    <PageContainer>
      <Header />
      <ContentWrapper>
        <SectionTitle>Fulfillment and Refund Policy</SectionTitle>
        <SectionSubtitle>
          <strong>Effective Date:</strong> 07/28/2025 <br />
          <strong>Last Updated:</strong> 07/28/2025
        </SectionSubtitle>

        <Typography paragraph>
          At <strong>{businessInfo?.name ? businessInfo.name : 'Comapany Name'}</strong>, we’re committed to providing high-quality products and services. All orders are handled with care and attention to ensure a great customer experience.
        </Typography>

        <Divider sx={{ my: 3, backgroundColor: "var(--color-primary)" }} />

        <SectionTitle>Order Fulfillment</SectionTitle>
        <Typography paragraph>
          Orders are processed as quickly as possible. Once an order is placed:
        </Typography>
        <StyledList>
          <StyledListItem>Orders are typically ready within <strong>2–3 business days</strong>.</StyledListItem>
          <StyledListItem>You'll receive a confirmation email when your order is ready.</StyledListItem>
          <StyledListItem><strong>Shipping or delivery availability</strong> may vary depending on product or location.</StyledListItem>
        </StyledList>

        <SectionTitle>Pickup Policy</SectionTitle>
        <Typography paragraph>
          If you've chosen in-person pickup, please arrive at the designated location and time. Unclaimed orders may not be eligible for refund or replacement due to time sensitivity.
        </Typography>

        <SectionTitle>Return & Refund Policy</SectionTitle>
        <Typography paragraph>
          Due to the nature of our products and services, <strong>returns are not accepted</strong>. If you experience any issues, we’ll work with you to find a solution.
        </Typography>

        <SectionTitle>Refunds & Replacements</SectionTitle>
        <StyledList>
          <StyledListItem>We offer refunds or replacements for <strong>defective, missing, or incorrect items</strong>.</StyledListItem>
          <StyledListItem>Please contact us within <strong>24 hours</strong> of receiving your order.</StyledListItem>
          <StyledListItem>Email <strong>{businessInfo.contactInfo.email}</strong> and include your order number and photo(s) if applicable.</StyledListItem>
        </StyledList>

        <SectionTitle>Cancellation Policy</SectionTitle>
        <StyledList>
          <StyledListItem>Orders may be canceled within <strong>24 hours</strong> of placement for a full refund.</StyledListItem>
          <StyledListItem>After this window, cancellation or refunds are not guaranteed.</StyledListItem>
        </StyledList>

        <SectionTitle>Secure Payment Processing</SectionTitle>
        <Typography paragraph>
          All payments are processed securely via <strong>Stripe</strong> and are compliant with <strong>PCI DSS</strong> industry standards.
        </Typography>

        <SectionTitle>Accepted Payment Methods</SectionTitle>
        <Typography paragraph>
          We accept <strong>Visa, Mastercard, American Express, Discover, and PayPal</strong>.
        </Typography>

        <SectionTitle>Contact Us</SectionTitle>
        <Typography paragraph>If you have any questions, please reach out:</Typography>
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
      {!acceptedCookieBool && <CookiePopup acceptCookies={acceptCookies} />}
    </PageContainer>
  );
};

export default FulfillmentPolicy;