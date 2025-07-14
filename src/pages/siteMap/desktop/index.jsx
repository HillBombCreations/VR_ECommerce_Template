import { useContext } from "react";

// Wrappers
import Header from "../../../components/wrappers/header/index.jsx";
import Footer from "../../../components/wrappers/footer/index.jsx";
import NavigationContext from "../../../context/navigation.jsx";

// MUI Imports
import { Box, Typography, Container, Link } from "@mui/material";
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
  color: "var(--color-primary-hover)",
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

const StyledGroupTitle = styled(Typography)(() => ({
  fontWeight: "bold",
  color: "var(--color-primary-hover)",
  marginBottom: "8px",
}));

const StyledLink = styled(Link)(() => ({
  color: "var(--color-primary-hover)",
  fontWeight: "bold",
  textDecoration: "none",
  transition: "var(--transition-base)",
  "&:hover": {
    textDecoration: "underline",
  },
}));

const SitemapPage = () => {
  const { xmlToJSON } = useContext(NavigationContext);

  const staticPages = [
    { path: "/", linklabel: "Home" },
    { path: "/privacypolicy", linklabel: "Privacy Policy" },
    { path: "/termsofuse", linklabel: "Terms of Use" },
    { path: "/fulfillmentpolicy", linklabel: "Fulfillment Policy" },
    { path: "/checkoutsuccess", linklabel: "Checkout Success" },
    { path: "/checkoutcancel", linklabel: "Checkout Cancel" },
    { path: "/sitemap", linklabel: "Sitemap (HTML)" },
    { path: "/sitemap.xml", linklabel: "Sitemap (XML)", external: true },
  ];

  return (
    <PageContainer>
      <Header />
      <ContentWrapper>
        <SectionTitle>Sitemap</SectionTitle>
        <Typography sx={{ mb: 3 }}>
          Explore all accessible pages on Your Sites Name:
        </Typography>

        {xmlToJSON.map((group, gIdx) => (
          <Box key={`group_${gIdx}`} sx={{ marginBottom: 4 }}>
            <StyledGroupTitle variant="h6">
              {group.label}
            </StyledGroupTitle>
            <StyledList>
              {group.pages.map((page, pIdx) => (
                <StyledListItem key={`page_${pIdx}`}>
                  <StyledLink href={page.path}>
                    {page.linklabel}
                  </StyledLink>
                </StyledListItem>
              ))}
            </StyledList>
          </Box>
        ))}

        <Box sx={{ marginTop: 6 }}>
          <StyledGroupTitle variant="h6">
            Additional Pages
          </StyledGroupTitle>
          <StyledList>
            {staticPages.map((page, idx) => (
              <StyledListItem key={`static_${idx}`}>
                <StyledLink
                  href={page.path}
                  target={page.external ? "_blank" : "_self"}
                  rel={page.external ? "noopener noreferrer" : undefined}
                >
                  {page.linklabel}
                </StyledLink>
              </StyledListItem>
            ))}
          </StyledList>
        </Box>
      </ContentWrapper>
      <Footer />
    </PageContainer>
  );
};

export default SitemapPage;