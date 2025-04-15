"use client";
import { useState } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
} from "@mui/material";
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
    backgroundImage:
        "linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(49, 2, 4, 0.9)), url('/images/home.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    position: "relative",
});

const FormContainer = styled(Box)(({ theme }) => ({
    backgroundColor: "rgba(13, 13, 13, 0.8)",
    padding: "50px",
    borderRadius: "12px",
    width: "100%",
    maxWidth: "450px",
    textAlign: "center",
    boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.1)",
    [theme.breakpoints.down("sm")]: {
        backgroundColor: "rgba(0, 0, 0.3, 0.3)",
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
            borderColor: "#ffffff",
        },
        "&.Mui-focused fieldset": {
            borderColor: "#ffffff",
        },
    },
    "& input": {
        color: "#fff",
        padding: "13px",
    },
    "& label": {
        color: "#aaa",
    },
    "& .MuiInputLabel-root.Mui-focused, & .MuiInputLabel-shrink": {
        color: "#ffffff",
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
    marginBottom: "24px",
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
    backgroundColor: "#310204",
    padding: "18px 0",
});

export default function Setpassword() {
    const [email, setEmail] = useState("");
    // const userCredentials = { "email": email };
    // const login = async () => {
    //     try {
    //         const data = await createUser(userCredentials);
    //         console.log(data)

    //     } catch (error) {
    //         console.error("Failed to login user:", error);
    //     }
    // };

    return (
        <Wrapper>
            <FormContainer>
                <LogoContainer>
                    <Image src="/images/Logo.png" alt="PlayKE Logo" width={100} height={50} priority />
                </LogoContainer>

                <Typography variant="h5" sx={{ color: "#fff", fontWeight: "bold", mb: 2 }}>
                    Reset Password
                </Typography>
                <Typography sx={{ color: "#ccc", fontSize: "0.95rem", mb: 2 }}>
                    We will send you an email with instructions on how to reset your password.
                </Typography>


                <Typography sx={{ color: "#fff", textAlign: "left", mb: 1, mt: 2, fontWeight: 500 }}>
                    Email Address
                </Typography>
                <InputField
                    fullWidth
                    variant="outlined"
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <NextButton variant="contained">Reset Password</NextButton>

                {/* Sign up link */}
                <Typography sx={{ fontSize: "0.875rem", mt: 4 }}>
                    <span style={{ color: "#e50914", fontWeight: "600" }}>Back to sign in</span>
                    <Link href="/auth/signin" passHref legacyBehavior>
                        <Typography component="span" sx={{ color: "#fff", fontWeight: "600", ml: 1, cursor: "pointer", textDecoration: "none" }}>
                            Login
                        </Typography>
                    </Link>
                </Typography>
            </FormContainer>

            <Footer>© {new Date().getFullYear()} PlayKE. All rights reserved.</Footer>
        </Wrapper>
    );
}
