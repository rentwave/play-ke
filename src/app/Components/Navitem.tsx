"use client";

import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { usePathname } from "next/navigation";
import React from "react";

interface NavItemProps {
  path: string;
  primary: string;
  icon: React.ReactNode;
  isOpen: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ path, primary, icon, isOpen }) => {
  const pathname = usePathname();
  const isActive = pathname === path;

  return (
    <ListItemButton
      selected={isActive}
      component="a"
      href={path}
      sx={{
        minHeight: isOpen ? 40 : 72, // Adjust height when collapsed
        px: 2.5,
        py: 1.5,
        mx: isOpen ? 1 : 1,
        borderRadius: "8px",
        bgcolor: isActive ? "rgba(128, 0, 32, 0.1)" : "transparent",
        color: isActive ? "#800020" : "grey",
        "&:hover": { bgcolor: "rgba(128, 0, 32, 0.2)" },
        display: "flex",
        flexDirection: isOpen ? "row" : "column", // Row when open, column when closed
        alignItems: isOpen ? "flex-start" : "center", // Align left when open, center when closed
        justifyContent: "center",
        textAlign: isOpen ? "left" : "center", // Align text properly
        gap: isOpen ? 1.5 : 0.5, // Space between icon & text
      }}
    >
      <ListItemIcon
        sx={{
          minWidth: isOpen ? 36 : "auto",
          color: isActive ? "#800020" : "grey",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 0.5,
        }}
      >
        {icon}
      </ListItemIcon>

      {isOpen ? (
        <ListItemText
          primary={primary}
          primaryTypographyProps={{
            fontSize: 14,
            fontWeight: isActive ? 500 : 500,
            color: isActive ? "#800020" : "grey",
          }}
          sx={{ ml: 1 }} // Add small spacing between icon and text
        />
      ) : (
        <Typography
          variant="caption"
          sx={{
            color: isActive ? "#800020" : "grey",
            fontWeight: isActive ? 500 : 500,
            mt: 0,
            textAlign: "center",
          }}
        >
          {primary}
        </Typography>
      )}
    </ListItemButton>
  );
};

export default NavItem;
