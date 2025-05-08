// components/Layout/MobileTopbar.tsx
"use client";

import { useState, useEffect } from "react";
import {
    AppBar,
    Toolbar,
    Box,
    Button,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Link,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/SearchTwoTone";
import MenuIcon from "@mui/icons-material/MenuTwoTone";
import Image from "next/image";

export default function MobileTopbar() {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = (open: boolean) => {
        setDrawerOpen(open);
    };

    return (
        <AppBar position="sticky" sx={{ backgroundColor: "#000", padding: "10px 0" }}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                {/* Logo */}
                <Box sx={{ display: "flex", alignItems: "center", ml: 1 }}>
                    <Image src="/images/Logo.png" alt="Logo" width={70} height={33} />
                </Box>

                {/* Actions */}
                <Box display="flex" alignItems="center" gap={1}>
                    <IconButton sx={{ color: "#fff" }}>
                        <SearchIcon />
                    </IconButton>

                    <Link href="/creator">
                        <Button
                            variant="contained"
                            sx={{
                                textTransform: "none",
                                fontWeight: "600",
                                backgroundColor: "#e50914",
                                "&:hover": { backgroundColor: "#C62828" },
                                borderRadius: "30px",
                                padding: "6px 12px",
                            }}
                        >
                            Post Content
                        </Button>
                    </Link>

                    <IconButton sx={{ color: "#fff" }} onClick={() => toggleDrawer(true)}>
                        <MenuIcon />
                    </IconButton>
                </Box>
            </Toolbar>

            {/* Mobile Drawer Menu */}
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
