"use client";
import { ReactNode } from 'react';
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
import Sidebar from "../Components/Layout/Sidebar";
import Topbar from "../Components/Layout/Topbar";
import Footer from "../Components/Layout/Footer";
import MobileTopbar from "../Components/Layout/MobileTopbar";

const Wrapper = styled("div")({
  minHeight: "100vh",
  display: "flex",
  flexDirection: "row",
  backgroundColor: "#000",
});

const Content = styled(Box)({
  // flex: 1,
  // display: "flex",
  // flexDirection: "column",
  backgroundColor: "#000",
  color: "#fff",
  minHeight: "100vh",
  // marginLeft: "250px",
});


interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  if (isMobile) {
    return (
      <Box sx={{ backgroundColor: "#000", color: "#fff", minHeight: "100vh" }}>
        <MobileTopbar />
        <Box sx={{ padding: 2 }}>{children}</Box>
      </Box>
    );
  }

  return (
    < Content >
      <Topbar />
      <Box>{children}</Box>
      <Footer />
    </Content >
  );
}
