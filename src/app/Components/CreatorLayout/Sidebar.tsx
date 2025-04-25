"use client";
import { Box, Typography, Avatar } from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import LibraryMusicOutlinedIcon from '@mui/icons-material/LibraryMusicOutlined';
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
import { useEffect, useState } from 'react'
import { useUserStore } from "@/store";

const SidebarWrapper = styled(Box)({
    width: "250px",
    backgroundColor: "#1A1A1A",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    minHeight: "100vh",
});

const MenuItem = styled(Box)({
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 16px",
    cursor: "pointer",
    borderRadius: "8px",
    transition: "background 0.3s ease",
    fontSize: "1rem",

    "&:hover": {
        backgroundColor: "#2A2A2A",
    },
});
type Artist = {
    name: string;
    stage_name: string;
    bio: string;
    profile_picture: string;
    origin_country: string;
    user_id: string;
    debut_year: string;
};

type Props = {
    artist: Artist;
};

export default function Sidebar({ artist }: Props) {
    const [isClient, setIsClient] = useState(false)
    const user = useUserStore.getState().user
    useEffect(() => {
        setIsClient(true)
    }, [])

    return (
        <SidebarWrapper>
            {/* Logo */}
            <Box mb={3} sx={{ width: "100%" }}>
                <Image src="/images/Logo.png" alt="PlayKE Logo" width={100} height={48} priority />
            </Box>

            {/* Profile */}
            <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
                <Box sx={{ position: "relative", width: 100, height: 100 }}>
                    <Avatar
                        sx={{ width: 90, height: 90 }}
                        src={artist?.profile_picture || ""} // Show preview if available
                    />
                </Box>
                {isClient && <Typography variant="body2" fontWeight="bold" mt={1} style={{ color: "#C8C8C8" }}>
                    {user?.full_name}
                </Typography>}

            </Box>

            {/* Menu */}
            <Box sx={{ width: "100%" }}>
                <MenuItem>
                    <LibraryMusicOutlinedIcon sx={{ color: "#fff" }} />
                    <Typography variant="body2">Content</Typography>
                </MenuItem>
                <MenuItem>
                    <AnalyticsOutlinedIcon sx={{ color: "#fff" }} />
                    <Typography variant="body2">Analytics</Typography>
                </MenuItem>
            </Box>
        </SidebarWrapper>
    );
}
