'use client'
import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Box, TextField, Button, Typography, InputAdornment, Link, IconButton, Drawer, List, ListItem, ListItemText, useMediaQuery, useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWalletTwoTone"; // Wallet icon (two-tone)
import SearchIcon from "@mui/icons-material/SearchTwoTone"; // Search icon (two-tone)
import MenuIcon from "@mui/icons-material/MenuTwoTone"; // Menu icon (two-tone)
import Image from 'next/image';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { useUserStore } from "@/store";

const SearchBar = styled(TextField)({
    width: "500px",  // Set the width for the search bar
    backgroundColor: "#222",
    borderRadius: "30px",  // Apply border radius to the whole field

    // Apply border-radius to the input container and the fieldset
    "& .MuiOutlinedInput-root": {
        borderRadius: "30px",  // Rounded borders for the whole input field
        "& fieldset": {
            borderColor: "#555",  // Border color when not focused
            borderRadius: "30px",  // Ensure fieldset follows the same rounding
        },
        "&:hover fieldset": {
            borderColor: "#e50914",  // Border color on hover
        },
        "&.Mui-focused fieldset": {
            borderColor: "#e50914",  // Border color when focused
        },
    },

    // Ensure the text inside is also styled as you wish
    "& .MuiInputBase-input": {
        color: "#fff",
        padding: "10px",
    },
});
const StyledIconButton = styled(IconButton)(() => ({
    borderRadius: '50%',
    backgroundColor: '#E50914', // Netflix red
    color: '#fff', // White text
    padding: '6px',
    width: '45px',
    height: '45px',
    '&:hover': {
        backgroundColor: '#b00610', // Darker on hover
    },
}))
const PostContentButton = styled(Button)(() => ({
    border: '1px solid #fff',
    borderRadius: '24px',
    backgroundColor: 'transparent',
    color: '#fff',
    fontWeight: 'bold',
    padding: '8px 16px',
    textTransform: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '2px', // space between icon and text
    '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
}))

export default function Topbar() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [isClient, setIsClient] = useState(false)
    const user = useUserStore.getState().user
    useEffect(() => {
        setIsClient(true)
    }, [])

    const toggleDrawer = (open: boolean) => {
        setDrawerOpen(open);
    };

    function getAbbreviation(fullName: string): string {
        if (!fullName || typeof fullName !== 'string') return '...'
        const nameParts = fullName.split(' ');
        if (nameParts.length === 1) {
            return `${nameParts[0].charAt(0).toUpperCase()}.`;
        } else if (nameParts.length >= 2) {
            const firstName = nameParts[0];
            const lastName = nameParts[1];
            return `${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`;
        }
        return fullName;
    }

    return (
        <AppBar position="sticky" sx={{ backgroundColor: "#000", padding: "10px 0" }}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                {/* Logo for mobile view */}
                {isMobile && (
                    <Box sx={{ display: "flex", alignItems: "center", marginLeft: "10px", marginRight: "10px" }}>
                        <Image
                            src="/images/Logo.png"
                            alt="Logo"
                            width={70}
                            height={33}
                        />
                    </Box>
                )}

                {/* Search Bar for larger screens */}
                {!isMobile && (
                    <SearchBar
                        variant="outlined"
                        placeholder="Search..."
                        size="small"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon sx={{ color: "#fff" }} />  {/* Set icon color to white */}
                                </InputAdornment>
                            ),
                        }}
                    />
                )}

                {/* Mobile View: Search Icon, Post Content Button, and Menu Icon */}
                {isMobile && (
                    <Box display="flex" alignItems="center" gap={1}>
                        {/* Search Icon */}
                        <IconButton sx={{ color: "#fff" }}>
                            <SearchIcon />  {/* Two-tone Search Icon */}
                        </IconButton>

                        {/* Post Content Button */}
                        <Link href="/creator"><Button
                            variant="contained"
                            sx={{
                                textTransform: "none",  // No text transform
                                fontWeight: "600",  // Semi-bold
                                backgroundColor: "#e50914",
                                "&:hover": { backgroundColor: "#C62828" },
                                borderRadius: "30px",  // Rounded corners for mobile
                                padding: "6px 12px",  // Smaller padding for mobile
                                display: "inline-block",  // Show this button on mobile
                            }}
                        >
                            Post Content
                        </Button></Link>

                        {/* Mobile Menu Button */}
                        <IconButton sx={{ color: "#fff" }} onClick={() => toggleDrawer(true)}>
                            <MenuIcon /> {/* Menu Icon */}
                        </IconButton>
                    </Box>
                )}

                {/* Desktop view: Right-aligned buttons (Donate, Post Content, Topup) */}
                {!isMobile && (
                    <Box display="flex" gap={1.5} alignItems="center">
                        <PostContentButton startIcon={<AccountBalanceWalletIcon />}>
                            Topup
                        </PostContentButton>
                        <Link href="/creator">
                            <PostContentButton startIcon={<AddTwoToneIcon />}>
                                Post Content
                            </PostContentButton></Link>

                        <StyledIconButton>
                            <Typography
                                variant="body2"
                                sx={{
                                    fontWeight: 'bold',
                                    fontSize: '1rem',
                                    lineHeight: 1,
                                }}
                            >
                                {isClient && user?.full_name && getAbbreviation(user.full_name)}
                            </Typography>
                        </StyledIconButton>
                    </Box>
                )}
            </Toolbar>

            {/* Drawer for mobile menu */}
            <Drawer anchor="right" open={drawerOpen} onClose={() => toggleDrawer(false)}>
                <Box sx={{ width: 250, backgroundColor: "#000", color: "#fff" }}>
                    <List>
                        <ListItem component="a">
                            <ListItemText primary="Donate" />
                        </ListItem>
                        <ListItem component="a">
                            <ListItemText primary="Post Content" />
                        </ListItem>
                        <ListItem component="a">
                            <ListItemText primary="Topup" />
                        </ListItem>
                        <ListItem component="a">
                            <ListItemText primary="Logout" />
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
        </AppBar>
    );
}
