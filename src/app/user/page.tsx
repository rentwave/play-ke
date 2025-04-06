"use client";
import { Container } from "@mui/material";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

// Styled Card Component
const StyledCard = styled(Card)({
  display: "flex",
  justifyContent: "center", // Center horizontally
  alignItems: "center", // Center vertically
  height: "200px", // Height of the card
  backgroundColor: "#1A1A1A", // Light black background
  borderRadius: "12px", // Rounded corners
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)", // Soft shadow for effect
  color: "#fff", // White text color
});

// Styled Hero Section
const HeroSection = styled(Box)(({ theme }) => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#000",
  color: "#fff",
  textAlign: "center",
  paddingTop: "10px",
  marginTop: "0px",
  [theme.breakpoints.down("md")]: {
    padding: "10px",
  },
}));

export default function Home() {
  return (
    <HeroSection>
      <Container maxWidth="">
        {/* Card inside HeroSection */}
        <StyledCard>
          <CardContent sx={{ textAlign: "center" }}>
            <Typography variant="h4" sx={{ fontWeight: "bold", fontSize: "2rem", color: "#fff" }}>
              Top up to seamlessly stream content
            </Typography>
          </CardContent>
        </StyledCard>
      </Container>
    </HeroSection>
  );
}
