"use client";
import { ReactNode, useState, useEffect } from 'react';
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
import Sidebar from "../Components/CreatorLayout/Sidebar";
import Topbar from "../Components/CreatorLayout/Topbar";
import Footer from "../Components/CreatorLayout/Footer";
import { useUserStore } from '@/store';
import { fetchArtist } from '@/lib/apiService';

const Wrapper = styled("div")({
  minHeight: "100vh",
  display: "flex",
  flexDirection: "row",
  backgroundColor: "#000",
});

const Content = styled(Box)({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#000",
  color: "#fff",
  minHeight: "100vh",
});

interface LayoutProps {
  children: ReactNode;
}


export default function Layout({ children }: LayoutProps) {
  const theme = useTheme();
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down("md"));
  const user = useUserStore.getState().user
  const [artist, setArtist] = useState(null);
  // const [loading, setLoading] = useState(false);
  // const [statusMessage, setStatusMessage] = useState("");
  useEffect(() => {
    const callFetchArtist = async () => {
      if (!user?.user_id) return
      // setLoading(true)
      try {
        const response = await fetchArtist({ artist: user.user_id })
        if (response.status_code === 200) {
          console.log("artist response", response)
          setArtist(response.body.data)
        } else {
          // setStatusMessage("An error occurred")
        }
      } catch (error) {
        console.error(error)
        // setStatusMessage("An unexpected error occurred")
      } finally {
        // setLoading(false)
      }
    }

    callFetchArtist()
  }, [user?.user_id])
  const ArtistPro = {
    name: '',
    stage_name: '',
    bio: '',
    profile_picture: '',
    origin_country: '',
    user_id: '',
    debut_year: '',
  };
  return (
    <Wrapper>
      {/* Conditionally render the Sidebar based on the screen size */}
      {!isMobileOrTablet && <Sidebar artist={artist || ArtistPro} />} {/* Only render Sidebar if the screen is larger than "md" */}

      <Content>
        <Topbar artist={artist || ArtistPro} />
        <Box>{children}</Box>
        <Footer />
      </Content>
    </Wrapper>
  );
}
