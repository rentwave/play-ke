'use client';

import { Box } from "@mui/material";
import DashboardIntro from "../Components/Home/HomeIntro";
import ArtistCarousel from "../Components/PopularArtists";

export default function DashboardPage() {
  return (
    <Box
      sx={{
        backgroundColor: "#0f0f0f",
        minHeight: "100vh",
        pt: { xs: 0, md: 0 },
      }}
    >
      <DashboardIntro />
      <ArtistCarousel />

    </Box>
  );
}
