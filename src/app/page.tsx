"use client";
import Image from "next/image";
import { Typography, Button, Box, AppBar, Toolbar, Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import MovieOutlinedIcon from '@mui/icons-material/MovieOutlined';
import MusicNoteOutlinedIcon from '@mui/icons-material/MusicNoteOutlined';
import LiveTvIcon from "@mui/icons-material/LiveTv";
import TheatersOutlinedIcon from '@mui/icons-material/TheatersOutlined';
import Link from "next/link"; // Import Link from Next.js
import MultiItemCarousel from "./Components/MultiItemCarousel";
import PulseBorderButton from "./Components/PulseBorderButton";

const contentItems = [
  { text: "Music", icon: <MusicNoteOutlinedIcon sx={{ color: "#e50914" }} /> },
  { text: "Movies", icon: <MovieOutlinedIcon sx={{ color: "#e50914" }} /> },
  { text: "Shows", icon: <TheatersOutlinedIcon sx={{ color: "#e50914" }} /> },
  { text: "Live Shows", icon: <LiveTvIcon sx={{ color: "#e50914" }} /> },
];

const Wrapper = styled("div")({
  minHeight: "100vh", // Use minHeight to ensure full viewport coverage
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#000",
});
const HeroSection = styled(Box)(({ theme }) => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#000",
  backgroundImage:
    "linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(49, 2, 4, 0.9)), url('/images/home.png')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  color: "#fff",
  textAlign: "center",
  padding: "20px",
  marginTop: "20px",
  [theme.breakpoints.down("md")]: {
    padding: "10px",
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
  backgroundColor: "#310204",
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
        <Container maxWidth="xl">
          <Typography
            variant="h2"
            sx={{
              mt: 0,
              mb: 2,
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: {
                xs: '1.8rem',
                sm: '3rem',
                md: '3rem',
              },
            }}
          >
            <span style={{ color: "#fff" }}>The Home of </span>
            <span style={{ color: "#fff" }}>Kenyan</span>
            <span style={{ color: "#fff" }}> Music</span>
            <span style={{ color: "#e50914" }}> &</span>
            <span style={{ color: "#fff" }}> Content</span>
          </Typography>
          <Typography
            variant="body2"
            sx={{
              mt: 0,
              color: "#DBDBDB", // Dark white for readability
              fontWeight: "400",
              fontSize: {
                xs: '1rem',
                sm: '1.2rem',
                md: '1.3rem',
              },
              textAlign: "center",
              maxWidth: "800px", // Keeps it compact and readable
              margin: "0 auto", // Centers the text
            }}
          > Where <span style={{ fontWeight: "bold", color: "#ffffff" }}>musicians, content creators, and local filmmakers</span> showcase their
            talent & find value in their work
          </Typography>

          <Typography
            variant="body2"
            sx={{
              my: 4,
              color: "#cccccc", // Dark white color
              fontSize: "0.95rem", // Reduced font size
              display: "flex",
              alignItems: "center",
              gap: "12px",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {contentItems.map((item, index) => (
              <span key={index} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                {item.icon}
                {item.text}
              </span>
            ))}
          </Typography>


          <Link href="/auth/signup" passHref>
            <PulseBorderButton />
          </Link>
          <MultiItemCarousel />
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
