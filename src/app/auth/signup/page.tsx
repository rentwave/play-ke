"use client";
import { Box, Button, TextField, Typography, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";
import GoogleIcon from "@/app/Components/Icons/Google";
import AppleIcon from "@/app/Components/Icons/Apple";
import FacebookIcon from "@/app/Components/Icons/Facebook";
import Link from "next/link";
import Image from "next/image";

const Wrapper = styled("div")({
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column", // Ensure the footer stays at the bottom
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
        backgroundColor: "rgba(0, 0, 0.1, 0.1)",
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

const OrDivider = styled(Divider)({
    color: "#fff",
    fontWeight: "bold",
    textTransform: "uppercase",
    margin: "20px 0",
});

const SocialButton = styled(Button)({
    width: "100%",
    padding: "10px",
    borderRadius: "30px",
    marginBottom: "10px",
    textTransform: "none",
    fontSize: "1rem",
    backgroundColor: "#0D0D0D",
    border: "1px solid #333",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    "&:hover": {
        backgroundColor: "#1A1A1A",
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

export default function Signup() {
    return (
        <Wrapper>
            <FormContainer>
                {/* Logo */}
                <LogoContainer>
                    <Image src="/images/Logo.png" alt="PlayKE Logo" width={120} height={60} priority />
                </LogoContainer>

                <Typography variant="h5" sx={{ color: "#fff", fontWeight: "bold", mb: 2 }}>
                    Sign up to Start Streaming
                </Typography>

                {/* Form Fields */}
                <InputField fullWidth variant="outlined" label="Full Name" />
                <InputField fullWidth variant="outlined" label="Email" />
                <InputField fullWidth variant="outlined" label="Phone Number" />


                {/* Next Button */}
                <Link href="/auth/setpassword" passHref legacyBehavior>
                    <NextButton variant="contained">Next</NextButton>
                </Link>


                {/* OR Divider */}
                <OrDivider>or</OrDivider>

                {/* Social Signup Buttons */}
                <SocialButton variant="contained">
                    <GoogleIcon />
                    Sign up with Google
                </SocialButton>

                <SocialButton variant="contained">
                    <FacebookIcon />
                    Sign up with Facebook
                </SocialButton>

                <SocialButton variant="contained">
                    <AppleIcon />
                    Sign up with Apple
                </SocialButton>
            </FormContainer>

            {/* Footer at the bottom */}
            <Footer>© {new Date().getFullYear()} PlayKE. All rights reserved.</Footer>
        </Wrapper>
    );
}
