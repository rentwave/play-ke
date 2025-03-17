"use client";

import { Button, Typography, Container } from "@mui/material";
import * as React from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import PrimaryButton from "./Components/Buttons/Primary";
import PrimaryOutlined from "./Components/Buttons/PrimaryOutlined";
import PrimarySmall from "./Components/Buttons/PrimarySmall";
import FormTextField from "./Components/InputFields/TextField";
import SelectTextFields from "./Components/InputFields/Select";

export default function Home() {
  return (
    <Container>
      <Typography variant="h6" color="primary">
        Sirocco MUI Modules breakdown
      </Typography>
      <Box sx={{ width: "100%", mb: 2 }}>
        <LinearProgress />
      </Box>
      {/* <PrimaryButton sx={{ mb: 3 }} /> <PrimaryOutlined sx={{ mb: 3 }} />{" "}
      <PrimarySmall sx={{ mb: 3 }} />
      <FormTextField sx={{ mb: 3 }} />
      <SelectTextFields sx={{}} /> */}
    </Container>
  );
}
