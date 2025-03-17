"use client";

import { Box, CssBaseline, IconButton } from "@mui/material";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Footer from "./Footer";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const sidebarWidth = isSidebarOpen ? 300 : 80;

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} />

      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          ml: `${sidebarWidth}px`,
          transition: "margin-left 0.5s",
        }}
      >
        {/* Topbar */}
        <Topbar sidebarWidth={sidebarWidth} />

        {/* Floating Toggle Button */}
        <IconButton
          onClick={toggleSidebar}
          sx={{
            position: "fixed",
            top: 20,
            left: isSidebarOpen ? 286 : 85,
            bgcolor: "white",
            borderRadius: "50%",
            border: "1px solid #EDEDED",
            boxShadow: "none",
            zIndex: 2000,
            width: 26,
            height: 26,
            minWidth: 26,
            minHeight: 26,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            "&:hover": { bgcolor: "grey.200" },
            transition: "left 0.5s",
          }}
        >
          {isSidebarOpen ? (
            <ArrowBackIosIcon sx={{ fontSize: 12, ml: 1 }} />
          ) : (
            <ArrowForwardIosIcon sx={{ fontSize: 12 }} />
          )}
        </IconButton>

        {/* Main Content */}
        <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
          {children}
        </Box>

        {/* Footer */}
        <Footer sidebarWidth={sidebarWidth} />
      </Box>
    </Box>
  );
};

export default Layout;
