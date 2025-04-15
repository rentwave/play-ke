"use client";
import { useState } from "react";
import {
    Box, Button, TextField, Typography, Divider, InputAdornment, IconButton, CircularProgress,
    Alert
} from "@mui/material";
import { styled } from "@mui/material/styles";
import GoogleIcon from "@/app/Components/Icons/Google";
import AppleIcon from "@/app/Components/Icons/Apple";
import FacebookIcon from "@/app/Components/Icons/Facebook";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/apiService";

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
    padding: "60px",
    borderRadius: "12px",
    width: "100%",
    maxWidth: "450px",
    textAlign: "center",
    boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.1)",

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
    marginBottom: "8px",
    backgroundColor: "#0D0D0D",
    borderRadius: "6px",

    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            borderColor: "#7c7c7c",
        },
        "&:hover fieldset": {
            borderColor: "#808080",
        },
        "&.Mui-focused fieldset": {
            borderColor: "#808080",
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

const OrDivider = styled(Divider)({
    color: "#fff",
    fontWeight: "bold",
    textTransform: "uppercase",
    margin: "10px 0",
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
    padding: "10px",
    borderRadius: "22px",
    marginTop: "10px",
    backgroundColor: "#e50914",
    color: "#fff",
    fontSize: "1rem",
    textTransform: "none",

    "&:hover": {
        backgroundColor: "#C62828",
    },

    "&.Mui-disabled": {
        backgroundColor: "#b22222", // a softer dark red
        color: "#fff",
        cursor: "not-allowed",
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

export default function Signup() {
    const router = useRouter();
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [statusMessage, setStatusMessage] = useState("");
    const [statusType, setStatusType] = useState<"success" | "error" | "">(""); // "" means no message

    const userCredentials = {
        full_name: fullName,
        email: email,
        phone_number: phoneNumber,
        password: password,
    };

    const callcreateUser = async () => {
        setLoading(true);
        setStatusMessage("");
        setStatusType("");
        try {
            const response = await createUser(userCredentials);
            if (response.code === "100.000.000") {
                setStatusMessage("Account created successfully. Redirecting to login...");
                setStatusType("success");
                setTimeout(() => {
                    router.push("/auth/signin");
                }, 2000);
            } else {
                setStatusMessage("Please check your details and try again.");
                setStatusType("error");
            }
            console.log("User created successfully:", response);
        } catch (error) {
            console.error("Failed to create user:", error);
            setStatusMessage("Please check your details and try again.");
            setStatusType("error");
        } finally {
            setLoading(false);
        }
    };


    return (
        <Wrapper>
            <FormContainer>
                {/* Logo */}
                <LogoContainer>
                    <Image src="/images/Logo.png" alt="PlayKE Logo" width={90} height={42} priority />
                </LogoContainer>

                <Typography variant="h5" sx={{ color: "#fff", fontWeight: "bold", mb: 2 }}>
                    Sign up to Start Streaming
                </Typography>
                {statusMessage && (
                    <Alert sx={{ mb: 2 }} severity={statusType || "error"}>{statusMessage}</Alert>

                )}


                {/* Form Fields */}
                <InputField
                    fullWidth
                    variant="outlined"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                />
                <InputField
                    fullWidth
                    variant="outlined"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <InputField
                    fullWidth
                    variant="outlined"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <InputField
                    fullWidth
                    variant="outlined"
                    placeholder="Set Password"
                    type={showConfirmPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                                    edge="end"
                                    sx={{ color: "#fff" }}
                                >
                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />


                {/* Next Button */}

                <NextButton onClick={callcreateUser} variant="contained" disabled={loading}>
                    {loading ? (
                        <CircularProgress size="30px" sx={{ color: '#ffffff' }} />
                    ) : (
                        "Next"
                    )}
                </NextButton>


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
                <Typography sx={{ fontSize: "0.875rem", mt: 4 }}>
                    <span style={{ color: "#7c7c7c", fontWeight: "400" }}>Already have an account?</span>
                    <Link href="/auth/signin" passHref legacyBehavior>
                        <Typography component="span" sx={{ color: "#fff", fontWeight: "600", ml: 1, cursor: "pointer", textDecoration: "none" }}>
                            Login
                        </Typography>
                    </Link>
                </Typography>
            </FormContainer>

            {/* Footer at the bottom */}
            <Footer>© {new Date().getFullYear()} PlayKE. All rights reserved.</Footer>
        </Wrapper>
    );
}
