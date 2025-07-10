import { useContext } from "react";

// Wrappers
import Header from "../../../components/wrappers/header";
import Footer from "../../../components/wrappers/footer";
import NavigationContext from "../../../context/navigation";

// MUI
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

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: "2rem",
  fontWeight: "bold",
  color: "#5d8842",
  marginBottom: "15px",

  [theme.breakpoints.down("sm")]: {
    fontSize: "1.5rem",
  },
}));

const StyledList = styled("ul")(({ theme }) => ({
  paddingLeft: "20px",
  marginBottom: "20px",
  [theme.breakpoints.down("sm")]: {
    paddingLeft: "15px",
  },
}));

const StyledListItem = styled("li")(({ theme }) => ({
  fontSize: "1rem",
  lineHeight: 1.6,
  marginBottom: "10px",
  color: "#3c4748",
  wordWrap: "break-word",

  [theme.breakpoints.down("sm")]: {
    fontSize: "0.95rem",
    marginBottom: "8px",
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
            <Typography sx={{ mb: 3, fontSize: { xs: "1rem", sm: "1.1rem" } }}>
                {/* UPDATE */}
                Explore all accessible pages on Your Sites Name:
            </Typography>
            {xmlToJSON.map((group, gIdx) => (
                <Box key={`group_${gIdx}`} sx={{ marginBottom: 4 }}>
                <Typography
                    variant="h6"
                    sx={{
                    fontWeight: "bold",
                    color: "#5d8842",
                    mb: 1,
                    fontSize: { xs: "1.1rem", sm: "1.25rem" },
                    }}
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
                            fontSize: "inherit",
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
                sx={{
                    fontWeight: "bold",
                    color: "#5d8842",
                    mb: 1,
                    fontSize: { xs: "1.1rem", sm: "1.25rem" },
                }}
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
                        fontSize: "inherit",
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