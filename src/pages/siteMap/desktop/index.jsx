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

const SitemapPage = () => {
  const { xmlToJSON } = useContext(NavigationContext);

  const staticPages = [
    { path: '/', linklabel: 'Home' },
    { path: '/privacypolicy', linklabel: 'Privacy Policy' },
    { path: '/termsofuse', linklabel: 'Terms of Use' },
    { path: '/fulfillmentpolicy', linklabel: 'Fulfillment Policy' },
    { path: '/checkoutsuccess', linklabel: 'Checkout Success' },
    { path: '/checkoutcancel', linklabel: 'Checkout Cancel' },
    { path: '/sitemap', linklabel: 'Sitemap (HTML)' },
    { path: '/sitemap.xml', linklabel: 'Sitemap (XML)', external: true },
  ];

  return (
    <PageContainer>
        <Header />
        <ContentWrapper>
            <SectionTitle>Sitemap</SectionTitle>
            <Typography sx={{ mb: 3 }}>
                {/* UPDATE */}
                Explore all accessible pages on Your Sites Name:
            </Typography>
            {xmlToJSON.map((group, gIdx) => (
                <Box key={`group_${gIdx}`} sx={{ marginBottom: 4 }}>
                <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", color: "#5d8842", mb: 1 }}
                >
                    {group.label}
                </Typography>
                <StyledList>
                    {group.pages.map((page, pIdx) => (
                    <StyledListItem key={`page_${pIdx}`}>
                        <Link
                        href={page.path}
                        sx={{
                            color: "#5d8842",
                            fontWeight: "bold",
                            textDecoration: "none",
                            "&:hover": { textDecoration: "underline" },
                        }}
                        >
                        {page.linklabel}
                        </Link>
                    </StyledListItem>
                    ))}
                </StyledList>
                </Box>
            ))}
            <Box sx={{ marginTop: 6 }}>
                <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "#5d8842", mb: 1 }}
                >
                Additional Pages
                </Typography>
                <StyledList>
                {staticPages.map((page, idx) => (
                    <StyledListItem key={`static_${idx}`}>
                    <Link
                        href={page.path}
                        target={page.external ? "_blank" : "_self"}
                        rel={page.external ? "noopener noreferrer" : undefined}
                        sx={{
                        color: "#5d8842",
                        fontWeight: "bold",
                        textDecoration: "none",
                        "&:hover": { textDecoration: "underline" },
                        }}
                    >
                        {page.linklabel}
                    </Link>
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