"use client";
import Image from "next/image";
import { Typography, Button, Box, AppBar, Toolbar, Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import Link from "next/link"; // Import Link from Next.js

const Wrapper = styled("div")({
  minHeight: "100vh", // Use minHeight to ensure full viewport coverage
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#000",
});

const HeroSection = styled(Box)(({ theme }) => ({
  flex: 1, // Allows the hero section to take up remaining space
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#000",
  color: "#fff",
  textAlign: "center",
  padding: "20px",
  marginTop: "20px",
  [theme.breakpoints.down("md")]: {
    padding: "10px",
  },
}));

const CTAButton = styled(Button)(({ theme }) => ({
  marginTop: "20px",
  backgroundColor: "#e50914",
  color: "#fff",
  fontSize: "1rem",
  padding: "8px 16px",
  "&:hover": {
    backgroundColor: "#C62828",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.9rem",
    padding: "6px 12px",
  },
}));

const LoginButton = styled(Button)(({ }) => ({
  backgroundColor: "#e50914",
  color: "#fff",
  fontSize: "0.9rem",
  padding: "6px 12px",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#A71A30",
  },
}));

const Footer = styled(Box)({
  backgroundColor: "#111",
  color: "#fff",
  textAlign: "center",
  padding: "18px 0",
  marginTop: "auto", // Pushes the footer to the bottom
});

export default function Home() {
  return (
    <Wrapper>
      {/* Top Bar (Full Width) */}
      <AppBar position="sticky" sx={{ backgroundColor: "#000", padding: "10px 0" }}>
        <Container maxWidth="xl">
          <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            {/* Logo */}
            <Image src="/images/Logo.png" alt="PlayKE Logo" width={105} height={50} priority />

            <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
              <Link href="/about" passHref legacyBehavior>
                <Typography variant="body1" sx={{ color: "#fff", textDecoration: "none", "&:hover": { color: "#e50914" } }}>
                  About
                </Typography>
              </Link>

              <Link href="/auth/signin" passHref legacyBehavior>
                <LoginButton variant="contained" size="small">Login</LoginButton>
              </Link>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Hero Section */}
      <HeroSection>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            sx={{
              mt: 0,
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: {
                xs: '2.5rem',
                sm: '3rem',
                md: '4rem',
              },
            }}
          >
            <span style={{ color: "#fff" }}>Stream </span>
            <span style={{ color: "#fff" }}>Kenyan</span>
            <span style={{ color: "#fff" }}> Music</span>
            <br />
            <span style={{ color: "#e50914" }}>&</span>
            <span style={{ color: "#fff" }}> Content</span>
          </Typography>
          <Typography variant="h6" sx={{ mt: 1, color: "#4CAF50", fontSize: "1.2rem" }}>
            Movies, Shows & Live Events
          </Typography>

          <Link href="/auth/signup" passHref>
            <CTAButton variant="contained" size="small" aria-label="Create Account">
              <span style={{ textTransform: "none" }}>Create Account to start streaming</span>
            </CTAButton>
          </Link>
        </Container>
      </HeroSection>

      {/* Footer */}
      <Footer>
        <Typography variant="body2">
          © 2025 Play KE ™ . All rights reserved.
        </Typography>
      </Footer>
    </Wrapper>
  );
}
