"use client";

import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import MovieIcon from "@mui/icons-material/Movie";
import PodcastIcon from "@mui/icons-material/Podcasts";

const SidebarWrapper = styled(Box)({
    width: "250px",
    backgroundColor: "#000",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start", // Align items to start
    padding: "20px",
    minHeight: "100vh",
});

const MenuItem = styled(Box)({
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "10px 15px",
    cursor: "pointer",
    borderRadius: "6px",
    transition: "background 0.3s ease",

    "&:hover": {
        backgroundColor: "#222",
    },
});

const BalanceCard = styled(Box)({
    width: "100%",
    backgroundColor: "#1A1A1A",
    padding: "20px",
    borderRadius: "8px",
    marginTop: "20px",
    textAlign: "center", // Center the text
});

const BalanceText = styled(Box)({
    fontSize: "1.5rem", // Increase the size of "Balance"
    fontWeight: "bold",
});

const AmountText = styled(Box)({
    fontSize: "2rem", // Increase the size of the amount
    fontWeight: "bold",
    color: "#e50914", // Make the amount stand out
});

export default function Sidebar() {
    return (
        <SidebarWrapper>
            {/* Logo at the start */}
            <Box>
                <Image src="/images/Logo.png" alt="PlayKE Logo" width={100} height={48} priority />
            </Box>

            {/* Balance Card */}
            <BalanceCard>
                <BalanceText>Balance</BalanceText>
                <AmountText>Ksh 0.00</AmountText>
            </BalanceCard>

            {/* Menu Items */}
            <Box sx={{ marginTop: "20px", width: "100%" }}>
                <MenuItem>
                    <MusicNoteIcon sx={{ color: "#fff" }} />
                    Music
                </MenuItem>
                <MenuItem>
                    <MovieIcon sx={{ color: "#fff" }} />
                    Movies
                </MenuItem>
                <MenuItem>
                    <PodcastIcon sx={{ color: "#fff" }} />
                    Podcasts
                </MenuItem>
            </Box>
        </SidebarWrapper>
    );
}
