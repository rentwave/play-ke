"use client";
import { Box, Typography, Tabs, Tab } from "@mui/material";
import { useState, useRef } from "react";
import MusicTable from "../Components/MediaDTs/Audio";

export default function Home() {
  const [tabIndex, setTabIndex] = useState(0);
  const fileInputRef = useRef<HTMLInputElement | null>(null);


  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  // const handleUploadClick = () => {
  //   fileInputRef.current?.click();
  // };

  return (
    <Box sx={{ mx: 3, mt: 0 }}>
      {/* Title */}
      <Typography variant="body2" fontWeight="bold" gutterBottom>
        Your Content
      </Typography>

      {/* Tabs */}
      <Tabs
        value={tabIndex}
        onChange={handleChange}
        textColor="inherit"
        indicatorColor="primary"
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          "& .MuiTab-root": {
            color: "#888",
            textTransform: "none",
            fontWeight: "bold",
            fontSize: "1rem",
          },
          "& .Mui-selected": {
            color: "#e50914",
          },
        }}
      >
        <Tab label="Audio" />
        <Tab label="Videos" />
        <Tab label="Podcasts" />
      </Tabs>

      {/* Tab Content */}
      <Box mt={3}>
        <Box
          sx={{
            backgroundColor: "#1A1A1A",
          }}
        >
          <Box mb={2}>
            {tabIndex === 0 && <MusicTable />}
            {tabIndex === 1 && "Upload your video content"}
            {tabIndex === 2 && "Upload your podcast content"}
          </Box>

          {/* <Button
            variant="contained"
            onClick={handleUploadClick}
            sx={{
              backgroundColor: "#e50914",
              textTransform: "none",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#cc0812",
              },
            }}
          >
            Upload Content
          </Button> */}

          <input
            type="file"
            ref={fileInputRef}
            hidden
            onChange={(e) => {
              if (e.target.files?.length) {
                console.log("Selected file:", e.target.files[0]);
              }
            }}
          />
        </Box>
      </Box>
    </Box >
  );
}
