"use client";
import Image from "next/image";
import { Typography, Button, Box, AppBar, Toolbar, Container } from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";
import MovieOutlinedIcon from '@mui/icons-material/MovieOutlined';
import MusicNoteOutlinedIcon from '@mui/icons-material/MusicNoteOutlined';
import LiveTvIcon from "@mui/icons-material/LiveTv";
import TheatersOutlinedIcon from '@mui/icons-material/TheatersOutlined';
import Link from "next/link"; // Import Link from Next.js
import MultiItemCarousel from "./Components/MultiItemCarousel";

const contentItems = [
  { text: "Music", icon: <MusicNoteOutlinedIcon sx={{ color: "#e50914" }} /> },
  { text: "Movies", icon: <MovieOutlinedIcon sx={{ color: "#e50914" }} /> },
  { text: "Shows", icon: <TheatersOutlinedIcon sx={{ color: "#e50914" }} /> },
  { text: "Live Events", icon: <LiveTvIcon sx={{ color: "#e50914" }} /> },
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





// const HeroSection = styled(Box)(({ theme }) => ({
//   flex: 1,
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "center",
//   justifyContent: "center",
//   backgroundColor: "#000",
//   backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/images/home.png')",
//   backgroundSize: "cover",
//   backgroundPosition: "center",
//   backgroundRepeat: "no-repeat",
//   color: "#fff",
//   textAlign: "center",
//   padding: "20px",
//   marginTop: "20px",
//   [theme.breakpoints.down("md")]: {
//     padding: "10px",
//   },
// }));
const borderFlow = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;
const CTAButton = styled(Button)(({ theme }) => ({
  position: "relative",
  marginTop: "20px",
  marginBottom: "60px",
  padding: "10px 20px",
  fontSize: "1rem",
  color: "#FFFFFF", // White text
  backgroundColor: "transparent", // Keep transparent for the outer element
  border: "none",
  borderRadius: "13px",
  cursor: "pointer",
  zIndex: 1,
  transition: "color 0.3s ease",

  // Border gradient effect container
  "&::before": {
    content: '""',
    position: "absolute",
    top: "-1px",
    right: "-1px",
    bottom: "-1px",
    left: "-1px",
    zIndex: -1,
    borderRadius: "13px", // Slightly larger than the button
    background: "linear-gradient(90deg, #e50914, #DBDBDB, #FFFFFF, #e50914)",
    backgroundSize: "300% 100%",
    animation: `${borderFlow} 5s linear infinite`,
  },

  // Inner background that reveals only the border
  "&::after": {
    content: '""',
    position: "absolute",
    top: "1px", // Border thickness
    right: "1px",
    bottom: "1px",
    left: "1px",
    zIndex: -1,
    borderRadius: "13px", // Slightly smaller
    backgroundColor: "#210103", // Dark shade of black
    transition: "background-color 0.3s ease",
  },

  // Hover effect
  "&:hover": {
    color: "#fff", // Stays white on hover
    "&::after": {
      backgroundColor: "#e50914", // Red on hover
    },
    "&::before": {
      animation: `${borderFlow} 3s linear infinite`, // Faster animation on hover
    }
  },

  // Responsive styles
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
                xs: '2rem',
                sm: '3rem',
                md: '3rem',
              },
            }}
          >
            <span style={{ color: "#fff" }}>Stream </span>
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
              fontSize: "1.4rem",
              textAlign: "center",
              maxWidth: "800px", // Keeps it compact and readable
              margin: "0 auto", // Centers the text
            }}
          > Where <span style={{ fontWeight: "bold", color: "#ffffff" }}>musicians, content creators, and local filmmakers</span> showcase their
            talent & find value in their work. Sign in to create, share, or support others.
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
            <CTAButton variant="contained" size="small" aria-label="Create Account">
              <span style={{ textTransform: "none" }}>Create an Account to Start Streaming</span>
            </CTAButton>
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
