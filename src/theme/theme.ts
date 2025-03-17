// src/theme/theme.ts
import { createTheme } from "@mui/material/styles";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#800020", // Customize your primary color
    },
    secondary: {
      main: "#dc004e",
    },
    grey: {
      300: "#ffffff", // Define a global grey for borders
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
});

export default theme;
