"use client";
import { Box, Button, TextField, Typography, FormControlLabel, Checkbox } from "@mui/material";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import Image from "next/image";

const Wrapper = styled("div")({
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    position: "relative",
});

const FormContainer = styled(Box)(({ theme }) => ({
    backgroundColor: "#0D0D0D",
    padding: "30px",
    borderRadius: "12px",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
    boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.1)",
    display: "flex",
    flexDirection: "column",
    minHeight: "600px", // Increased height

    [theme.breakpoints.down("sm")]: {
        backgroundColor: "#000",
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
        fontWeight: 600, // Semibold labels
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
    marginBottom: "24px", // Moves text below downwards
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
                    Signin to PlayKE
                </Typography>

                {/* Form Fields */}
                <Typography sx={{ color: "#fff", textAlign: "left", mb: 1, fontWeight: 600 }}>Email or Phone Number</Typography>
                <InputField fullWidth variant="outlined" label="Email or Phone Number" />

                <Typography sx={{ color: "#fff", textAlign: "left", mb: 1, fontWeight: 600 }}>Password</Typography>
                <InputField fullWidth variant="outlined" label="Password" />

                {/* Remember Me and Forgot Password */}
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", mb: 2 }}>
                    <FormControlLabel control={<Checkbox sx={{ color: "#fff" }} />} label={<Typography sx={{ color: "#fff", fontSize: "0.875rem" }}>Remember Me</Typography>} />
                    <Link href="#" passHref legacyBehavior >
                        <Typography component="a" sx={{ color: "#e50914", fontSize: "0.875rem", cursor: "pointer", textDecoration: "none", fontWeight: "600" }}>
                            Forgot Password?
                        </Typography>
                    </Link>
                </Box>

                {/* Next Button */}
                <NextButton variant="contained">Sign In</NextButton>

                {/* Sign Up Link */}
                <Typography sx={{ fontSize: "0.875rem", mt: 4 }}>
                    <span style={{ color: "#e50914", fontWeight: "600" }}>Don’t have an account?</span>
                    <Link href="#" passHref legacyBehavior>
                        <Typography component="span" sx={{ color: "#fff", fontWeight: "600", ml: 1, cursor: "pointer", textDecoration: "none" }}>Sign Up</Typography>
                    </Link>
                </Typography>
            </FormContainer>

            {/* Footer at the bottom */}
            <Footer>© {new Date().getFullYear()} PlayKE. All rights reserved.</Footer>
        </Wrapper>
    );
}
