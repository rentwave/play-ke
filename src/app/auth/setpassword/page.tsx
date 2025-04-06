"use client";
import { Box, Button, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";

const Wrapper = styled("div")({
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    backgroundImage:
        "linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(49, 2, 4, 0.9)), url('/images/home.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    position: "relative",
});

const FormContainer = styled(Box)(({ theme }) => ({
    backgroundColor: "rgba(13, 13, 13, 0.8)", // Reduced opacity
    padding: "30px",
    borderRadius: "12px",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
    boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.1)",

    // Make background slightly transparent on small screens
    [theme.breakpoints.down("sm")]: {
        backgroundColor: "rgba(0, 0, 0.3, 0,3)",
    },
}));

const LogoContainer = styled(Box)({
    display: "flex",
    justifyContent: "center",
    marginBottom: "15px",
});

const InputField = styled(TextField)({
    marginBottom: "18px",
    backgroundColor: "#0D0D0D",
    borderRadius: "6px",

    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            borderColor: "#808080",
        },
        "&:hover fieldset": {
            borderColor: "#e50914",
        },
        "&.Mui-focused fieldset": {
            borderColor: "#e50914",
        },
    },
    "& input": {
        color: "#fff",
        padding: "15px",
    },
    "& label": {
        color: "#aaa",
    },
    "& .MuiInputLabel-root.Mui-focused, & .MuiInputLabel-shrink": {
        color: "#e50914",
    },
});

const NextButton = styled(Button)({
    width: "100%",
    padding: "8px",
    borderRadius: "6px",
    backgroundColor: "#e50914",
    color: "#fff",
    fontSize: "1rem",
    textTransform: "none",
    marginTop: "auto", // Pushes the button to the bottom
    "&:hover": {
        backgroundColor: "#C62828",
    },
});

const Footer = styled(Box)({
    width: "100%",
    position: "absolute",
    bottom: "0",
    textAlign: "center",
    color: "#fff",
    fontSize: "0.875rem",
    backgroundColor: "#111",
    padding: "18px 0",
});

export default function Setpassword() {
    return (
        <Wrapper>
            <FormContainer>
                {/* Logo */}
                <LogoContainer>
                    <Image src="/images/Logo.png" alt="PlayKE Logo" width={120} height={60} priority />
                </LogoContainer>

                <Typography variant="h5" sx={{ color: "#fff", fontWeight: "bold", mb: 2 }}>
                    Set Password to Continue
                </Typography>

                {/* Form Fields */}
                <Typography sx={{ color: "#fff", textAlign: "left", mb: 1 }}>Set Password</Typography>
                <InputField fullWidth variant="outlined" label="Set Password" />

                <Typography sx={{ color: "#fff", textAlign: "left", mb: 1 }}>Confirm Password</Typography>
                <InputField fullWidth variant="outlined" label="Confirm Password" />

                {/* Next Button at the bottom */}
                <NextButton variant="contained">Submit</NextButton>
            </FormContainer>

            {/* Footer at the bottom */}
            <Footer>© {new Date().getFullYear()} PlayKE. All rights reserved.</Footer>
        </Wrapper>
    );
}
