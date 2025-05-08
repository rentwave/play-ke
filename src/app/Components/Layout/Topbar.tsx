'use client';
import React, { useState, useEffect } from "react";
import {
    AppBar, Toolbar, Box, TextField, Button, Tooltip, Typography, InputAdornment, Link, IconButton,
    Drawer, List, ListItem, ListItemText, alpha, useMediaQuery, useTheme, Avatar, Divider, Badge,
    ListItemIcon, Chip
} from "@mui/material";
import { styled } from "@mui/material/styles";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWalletTwoTone";
import SearchIcon from "@mui/icons-material/SearchTwoTone";
import MenuIcon from "@mui/icons-material/MenuRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import MusicNoteRoundedIcon from "@mui/icons-material/MusicNoteRounded";
import MovieRoundedIcon from "@mui/icons-material/MovieRounded";
import HeadphonesRoundedIcon from "@mui/icons-material/HeadphonesRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Image from 'next/image';
import { useUserStore } from "@/store";

// Styled Components
const SearchBar = styled(TextField)(({ theme }) => ({
    width: "320px",
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: "12px",
    transition: "all 0.3s ease",
    "&:hover": {
        backgroundColor: "rgba(255,255,255,0.08)",
    },
    "& .MuiOutlinedInput-root": {
        borderRadius: "12px",
        "& fieldset": {
            borderColor: "transparent",
        },
        "&:hover fieldset": {
            borderColor: "rgba(229,9,20,0.5)",
        },
        "&.Mui-focused fieldset": {
            borderColor: "#e50914",
            borderWidth: "1px",
        },
        "&.Mui-focused": {
            backgroundColor: "rgba(255,255,255,0.08)",
        }
    },
    "& .MuiInputBase-input": {
        color: "#fff",
        padding: "10px 12px",
        fontSize: "0.95rem",
    },
    "& .MuiInputAdornment-root": {
        marginLeft: "8px",
    }
}));

const NavItem = styled(Link)(({ theme }) => ({
    color: "#fff",
    textDecoration: "none",
    fontWeight: 500,
    fontSize: "0.95rem",
    padding: "6px 16px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    transition: "all 0.2s ease",
    '&:hover': {
        backgroundColor: "rgba(255,255,255,0.08)",
        color: "#fff",
    },
    '&.active': {
        backgroundColor: "rgba(229,9,20,0.1)",
        color: "#e50914",
    }
}));

const WalletButton = styled(Button)(({ theme }) => ({
    borderRadius: "12px",
    color: "#fff",
    borderColor: "transparent",
    backgroundColor: "rgba(255,255,255,0.07)",
    textTransform: 'none',
    boxShadow: 'none',
    transition: "all 0.2s ease",
    '&:hover': {
        backgroundColor: "rgba(255,255,255,0.12)",
        borderColor: "transparent",
    },
    display: "flex",
    alignItems: "center",
    padding: "8px 16px",
    height: "42px",
}));

const PostButton = styled(Button)(({ theme }) => ({
    borderRadius: "12px",
    color: "#fff",
    backgroundColor: "#e50914",
    textTransform: 'none',
    fontWeight: 600,
    boxShadow: '0 2px 8px rgba(229,9,20,0.3)',
    transition: "all 0.2s ease",
    '&:hover': {
        backgroundColor: "#c50812",
        boxShadow: '0 4px 12px rgba(229,9,20,0.5)',
    },
    padding: "8px 16px",
    height: "42px",
}));

const UserAvatar = styled(Button)(({ theme }) => ({
    borderRadius: "12px",
    color: "#fff",
    backgroundColor: "rgba(255,255,255,0.07)",
    textTransform: 'none',
    fontWeight: 500,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "5px 6px 5px 5px",
    minWidth: "auto",
    height: "42px",
    transition: "all 0.2s ease",
    '&:hover': {
        backgroundColor: "rgba(255,255,255,0.12)",
    },
}));

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
    width: 32,
    height: 32,
    backgroundColor: "#e50914",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "0.9rem",
}));

const MobileDrawer = styled(Drawer)(({ theme }) => ({
    '& .MuiDrawer-paper': {
        width: 280,
        backgroundColor: "#111",
        color: "#fff",
        borderTopLeftRadius: 16,
        borderBottomLeftRadius: 16,
    },
}));

const DrawerListItem = styled(ListItem)(({ theme }) => ({
    borderRadius: 8,
    margin: "4px 8px",
    '&:hover': {
        backgroundColor: "rgba(255,255,255,0.08)",
    },
}));

export default function Topbar() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const [activeNav, setActiveNav] = useState("home");
    const user = useUserStore.getState().user;

    useEffect(() => {
        setIsClient(true);
        // Determine active nav based on current path
        const path = window.location.pathname;
        if (path.includes("/music")) setActiveNav("music");
        else if (path.includes("/movies")) setActiveNav("movies");
        else if (path.includes("/podcasts")) setActiveNav("podcasts");
        else setActiveNav("home");
    }, []);

    const toggleDrawer = (open) => {
        setDrawerOpen(open);
    };

    function getAbbreviation(fullName) {
        if (!fullName || typeof fullName !== 'string') return 'U';
        const nameParts = fullName.split(' ');
        if (nameParts.length === 1) {
            return `${nameParts[0].charAt(0).toUpperCase()}`;
        } else if (nameParts.length >= 2) {
            const firstName = nameParts[0];
            const lastName = nameParts[1];
            return `${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`;
        }
        return 'U';
    }

    const navItems = [
        { label: "Home", href: "/", icon: <HomeRoundedIcon sx={{ fontSize: 20 }} />, id: "home" },
        { label: "Music", href: "/music", icon: <MusicNoteRoundedIcon sx={{ fontSize: 20 }} />, id: "music" },
        { label: "Movies", href: "/movies", icon: <MovieRoundedIcon sx={{ fontSize: 20 }} />, id: "movies" },
        { label: "Podcasts", href: "/podcasts", icon: <HeadphonesRoundedIcon sx={{ fontSize: 20 }} />, id: "podcasts" }
    ];

    return (
        <AppBar
            elevation={0}
            position="sticky"
            sx={{
                backgroundColor: "#0f0f0f",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
                padding: "8px 0"
            }}>
            <Toolbar sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                px: { xs: 2, sm: 3, md: 4 }
            }}>
                {/* Left section: Logo and Navigation */}
                <Box sx={{ display: "flex", alignItems: "center", gap: isSmall ? 1 : 3 }}>
                    <Link href="/" sx={{ display: "flex", alignItems: "center" }}>
                        <Image
                            src="/images/Logo.png"
                            alt="Logo"
                            width={70}
                            height={33}
                            style={{
                                filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))"
                            }}
                        />
                    </Link>

                    {!isMobile && (
                        <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
                            {navItems.map((item) => (
                                <NavItem
                                    key={item.id}
                                    href={item.href}
                                    className={activeNav === item.id ? "active" : ""}
                                    onClick={() => setActiveNav(item.id)}
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 0.8
                                    }}
                                >
                                    {item.icon}
                                    {item.label}
                                </NavItem>
                            ))}
                        </Box>
                    )}
                </Box>

                {/* Middle section: Search */}
                {!isMobile && (
                    <Box sx={{
                        position: "absolute",
                        left: "50%",
                        transform: "translateX(-50%)",
                        display: { xs: "none", md: "block" }
                    }}>
                        <SearchBar
                            variant="outlined"
                            placeholder="Search for music, movies, podcasts..."
                            size="small"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon sx={{ color: "rgba(255,255,255,0.7)" }} />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                )}

                {/* Right section: Actions */}
                <Box display="flex" alignItems="center" gap={1.5}>
                    {!isMobile && (
                        <>
                            <Tooltip title="Notifications" arrow>
                                <IconButton
                                    size="small"
                                    sx={{
                                        color: "#fff",
                                        backgroundColor: "rgba(255,255,255,0.07)",
                                        width: 42,
                                        height: 42,
                                        borderRadius: 3,
                                        '&:hover': {
                                            backgroundColor: "rgba(255,255,255,0.12)",
                                        }
                                    }}
                                >
                                    <Badge badgeContent={3} color="error">
                                        <NotificationsRoundedIcon sx={{ fontSize: 20 }} />
                                    </Badge>
                                </IconButton>
                            </Tooltip>

                            <Tooltip title="Your Balance" arrow>
                                <WalletButton>
                                    <AccountBalanceWalletIcon sx={{ mr: 1, fontSize: 20, color: "rgba(255,255,255,0.8)" }} />
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            fontWeight: 500,
                                            textTransform: 'none',
                                            color: "rgba(255,255,255,0.95)"
                                        }}
                                    >
                                        KES 2,500
                                    </Typography>
                                </WalletButton>
                            </Tooltip>

                            <Link href="/creator" sx={{ textDecoration: "none" }}>
                                <PostButton startIcon={<AddRoundedIcon />}>
                                    Post Content
                                </PostButton>
                            </Link>

                            <Tooltip title="Account" arrow>
                                <UserAvatar>
                                    <ProfileAvatar>
                                        {isClient && user?.full_name && getAbbreviation(user.full_name)}
                                    </ProfileAvatar>
                                    <KeyboardArrowDownIcon sx={{ fontSize: 18, ml: 0.5, color: "rgba(255,255,255,0.6)" }} />
                                </UserAvatar>
                            </Tooltip>
                        </>
                    )}

                    {isMobile && (
                        <>
                            <IconButton
                                sx={{
                                    color: "#fff",
                                    backgroundColor: "rgba(255,255,255,0.07)",
                                    width: isSmall ? 38 : 42,
                                    height: isSmall ? 38 : 42,
                                    borderRadius: 2,
                                    '&:hover': {
                                        backgroundColor: "rgba(255,255,255,0.12)",
                                    }
                                }}
                            >
                                <SearchIcon sx={{ fontSize: isSmall ? 18 : 20 }} />
                            </IconButton>

                            <Link href="/creator" sx={{ textDecoration: "none" }}>
                                <Button
                                    variant="contained"
                                    startIcon={!isSmall && <AddRoundedIcon />}
                                    sx={{
                                        textTransform: "none",
                                        fontWeight: "600",
                                        backgroundColor: "#e50914",
                                        "&:hover": { backgroundColor: "#C62828" },
                                        borderRadius: "12px",
                                        px: isSmall ? 1.5 : 2,
                                        py: 1,
                                        height: isSmall ? 38 : 42,
                                        boxShadow: "0 2px 8px rgba(229,9,20,0.3)",
                                    }}
                                >
                                    {isSmall ? <AddRoundedIcon fontSize="small" /> : "Post Content"}
                                </Button>
                            </Link>

                            <IconButton
                                onClick={() => toggleDrawer(true)}
                                sx={{
                                    color: "#fff",
                                    backgroundColor: "rgba(255,255,255,0.07)",
                                    width: isSmall ? 38 : 42,
                                    height: isSmall ? 38 : 42,
                                    borderRadius: 2,
                                    '&:hover': {
                                        backgroundColor: "rgba(255,255,255,0.12)",
                                    }
                                }}
                            >
                                <MenuIcon sx={{ fontSize: isSmall ? 18 : 20 }} />
                            </IconButton>
                        </>
                    )}
                </Box>
            </Toolbar>

            {/* Mobile Drawer */}
            <MobileDrawer anchor="right" open={drawerOpen} onClose={() => toggleDrawer(false)}>
                <Box sx={{ pt: 2, pb: 2 }}>
                    {/* User Profile Section */}
                    <Box sx={{ display: "flex", alignItems: "center", px: 3, py: 2 }}>
                        <ProfileAvatar sx={{ width: 40, height: 40, mr: 2 }}>
                            {isClient && user?.full_name && getAbbreviation(user.full_name)}
                        </ProfileAvatar>
                        <Box>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                {isClient && user?.full_name ? user.full_name : "User"}
                            </Typography>
                            <Chip
                                label="Premium"
                                size="small"
                                sx={{
                                    bgcolor: "rgba(229,9,20,0.15)",
                                    color: "#e50914",
                                    fontSize: "0.7rem",
                                    height: 20,
                                    fontWeight: 600
                                }}
                            />
                        </Box>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", px: 3, py: 2 }}>
                        <WalletButton sx={{ flex: 1, justifyContent: "center" }}>
                            <AccountBalanceWalletIcon sx={{ mr: 1, fontSize: 18 }} />
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                KES 2,500
                            </Typography>
                        </WalletButton>
                    </Box>

                    <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", my: 1.5 }} />

                    {/* Navigation Items */}
                    <List sx={{ pt: 0, pb: 0 }}>
                        {navItems.map((item) => (
                            <DrawerListItem
                                key={item.id}
                                component="a"
                                href={item.href}
                                disablePadding
                                sx={{
                                    backgroundColor: activeNav === item.id ? "rgba(229,9,20,0.1)" : "transparent",
                                    color: activeNav === item.id ? "#e50914" : "#fff",
                                }}
                            >
                                <ListItemIcon sx={{ minWidth: 36, color: "inherit" }}>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.label}
                                    primaryTypographyProps={{
                                        fontSize: "0.95rem",
                                        fontWeight: activeNav === item.id ? 600 : 500
                                    }}
                                />
                            </DrawerListItem>
                        ))}
                    </List>

                    <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", my: 1.5 }} />

                    {/* Other Options */}
                    <List sx={{ pt: 0, pb: 0 }}>
                        <DrawerListItem component="a" href="/creator" disablePadding>
                            <ListItemIcon sx={{ minWidth: 36 }}>
                                <AddRoundedIcon sx={{ color: "#e50914" }} />
                            </ListItemIcon>
                            <ListItemText
                                primary="Post Content"
                                primaryTypographyProps={{
                                    fontSize: "0.95rem",
                                    fontWeight: 600,
                                    color: "#e50914"
                                }}
                            />
                        </DrawerListItem>

                        <DrawerListItem component="a" href="/account" disablePadding>
                            <ListItemIcon sx={{ minWidth: 36 }}>
                                <LogoutRoundedIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary="Sign Out"
                                primaryTypographyProps={{ fontSize: "0.95rem" }}
                            />
                        </DrawerListItem>
                    </List>
                </Box>
            </MobileDrawer>
        </AppBar>
    );
}