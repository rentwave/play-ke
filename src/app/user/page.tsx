// app/page.tsx
"use client";
import { Container, Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const HeroSection = styled(Box)(({ theme }) => ({
  flex: 1,
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



export default function Home() {
  return (
    <HeroSection>
      <Container maxWidth="lg">

      </Container>
    </HeroSection>
  );
}
