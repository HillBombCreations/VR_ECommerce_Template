/* eslint-disable react/no-unescaped-entities */
import { Component } from "react";
import Cookies from "js-cookie";

// Wrappers
import Header from "../../../components/wrappers/header";
import Footer from "../../../components/wrappers/footer";
import CookiePopup from "../../../components/universal/cookiePopup.jsx";

// MUI Imports
import { Box, Typography, Container, Divider, Link } from "@mui/material";
import { styled } from "@mui/material/styles";

// Styled Components using global CSS variables
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

export default class FulfillmentPolicy extends Component {
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
          <SectionTitle>Fulfillment and Refund Policy</SectionTitle>
          <SectionSubtitle>
            <strong>Effective Date:</strong> MM/DD/YYYY <br />
            <strong>Last Updated:</strong> MM/DD/YYYY
          </SectionSubtitle>

          <Typography>
            At <strong>[Your Company Name]</strong>, we take pride in delivering
            quality products and services. Each order is carefully processed to
            ensure a smooth experience for our customers.
          </Typography>

          <Divider sx={{ my: 3, backgroundColor: "var(--color-primary)" }} />

          <SectionTitle>Order Fulfillment</SectionTitle>
          <Typography>
            Once your order is placed, our team begins preparing it for
            completion:
          </Typography>
          <StyledList>
            <StyledListItem>
              Orders are typically processed within{" "}
              <strong>2–3 business days</strong>.
            </StyledListItem>
            <StyledListItem>
              You will receive an email notification when your order is ready.
            </StyledListItem>
            <StyledListItem>
              <strong>Shipping and delivery options</strong> may vary based on
              your location and product type.
            </StyledListItem>
          </StyledList>

          <SectionTitle>Pickup Policy</SectionTitle>
          <Typography>
            If you've selected local pickup, please collect your order at the
            scheduled time and location. Missed pickups may result in
            non-refundable orders.
          </Typography>

          <SectionTitle>Return & Refund Policy</SectionTitle>
          <Typography>
            Due to the nature of our products and services,{" "}
            <strong>returns are not accepted</strong>. However, if there is an
            issue with your order, we are committed to resolving it promptly.
          </Typography>

          <SectionTitle>Refunds & Replacements</SectionTitle>
          <StyledList>
            <StyledListItem>
              Applies to <strong>defective, incorrect, or missing items</strong>.
            </StyledListItem>
            <StyledListItem>
              Contact us within <strong>24 hours of receiving your order</strong>.
            </StyledListItem>
            <StyledListItem>
              Email <strong>[your@email.com]</strong> with your order number and
              photos if applicable.
            </StyledListItem>
          </StyledList>

          <SectionTitle>Cancellation Policy</SectionTitle>
          <StyledList>
            <StyledListItem>
              Orders may be canceled within{" "}
              <strong>24 hours of placement</strong> for a full refund.
            </StyledListItem>
            <StyledListItem>
              After this period, cancellations may not be accepted depending on
              order status.
            </StyledListItem>
          </StyledList>

          <SectionTitle>Secure Payment Processing</SectionTitle>
          <Typography>
            All transactions are processed securely via <strong>Stripe</strong>{" "}
            and meet <strong>PCI DSS standards</strong> to protect your payment
            data.
          </Typography>

          <SectionTitle>Accepted Payment Methods</SectionTitle>
          <Typography>
            We accept <strong>Visa, Mastercard, American Express, Discover, and PayPal</strong>.
          </Typography>

          <SectionTitle>Contact Us</SectionTitle>
          <Typography>For questions or concerns, please contact us:</Typography>
          <StyledList>
            <StyledListItem>
              <strong>Email:</strong>{" "}
              <Link
                href="mailto:your@email.com"
                sx={{ color: "var(--color-primary)", fontWeight: "bold" }}
              >
                your@email.com
              </Link>
            </StyledListItem>
            <StyledListItem>
              <strong>Phone:</strong> (000) 000-0000
            </StyledListItem>
            <StyledListItem>
              <strong>Business Address:</strong> 1234 Example Rd, Your City, ST 12345
            </StyledListItem>
          </StyledList>
        </ContentWrapper>

        <Footer />
        {!this.state.acceptedCookieBool && (
          <CookiePopup acceptCookies={acceptCookies} />
        )}
      </PageContainer>
    );
  }
}