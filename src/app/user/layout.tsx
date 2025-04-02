"use client";
import { ReactNode } from 'react';
import { Box, Container, useMediaQuery, useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
import Sidebar from "../Components/Layout/Sidebar";
import Topbar from "../Components/Layout/Topbar";
import Footer from "../Components/Layout/Footer";

const Wrapper = styled("div")({
  minHeight: "100vh",
  display: "flex",
  flexDirection: "row",
  backgroundColor: "#000",
});

const Content = styled(Box)({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#000",
  color: "#fff",
  minHeight: "100vh",
});

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const theme = useTheme();  // Get theme to access breakpoints
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down("md"));  // Checks if the screen size is mobile/tablet

  return (
    <Wrapper>
      {/* Conditionally render the Sidebar based on the screen size */}
      {!isMobileOrTablet && <Sidebar />} {/* Only render Sidebar if the screen is larger than "md" */}

      <Content>
        <Topbar />
        <Container maxWidth="xl">{children}</Container>
        <Footer />
      </Content>
    </Wrapper>
  );
}
