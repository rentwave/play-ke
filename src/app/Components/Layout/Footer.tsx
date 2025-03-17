"use client";
import { Box, Typography } from "@mui/material";

const Footer = ({ sidebarWidth }: { sidebarWidth: number }) => {
  return (
    <Box
      component="footer"
      sx={{
        width: `calc(100% - ${sidebarWidth}px)`,
        ml: `${sidebarWidth}px`,
        bgcolor: "white",
        textAlign: "center",
        p: 2,
        position: "absolute",
        bottom: 0,
        left: 0,
        transition: "margin-left 0.3s, width 0.3s",
      }}
    >
      <Typography variant="body2">© 2025 Sirocco</Typography>
    </Box>
  );
};

export default Footer;
