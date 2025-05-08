"use client";
import { useState } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    InputAdornment,
    IconButton,
    CircularProgress,
    Alert,
    Container,
    Paper
} from "@mui/material";
import { styled } from "@mui/material/styles";
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
        "linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(49, 2, 4, 0.95)), url('/images/home.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    position: "relative",
    overflow: "hidden",
});

const FormContainer = styled(Paper)(({ theme }) => ({
    backgroundColor: "rgba(13, 13, 13, 0.85)",
    padding: "48px 60px",
    borderRadius: "16px",
    width: "100%",
    maxWidth: "450px",
    textAlign: "center",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3), 0 4px 16px rgba(255, 30, 30, 0.1)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    transition: "all 0.3s ease",
    '&:hover': {
        boxShadow: "0 12px 40px rgba(0, 0, 0, 0.4), 0 6px 20px rgba(255, 30, 30, 0.15)",
    },
    [theme.breakpoints.down("sm")]: {
        padding: "40px 24px",
        backgroundColor: "rgba(13, 13, 13, 0.92)",
    },
}));

const LogoContainer = styled(Box)({
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
    position: "relative",
    '&::after': {
        content: '""',
        position: "absolute",
        bottom: "-10px",
        width: "40%",
        height: "2px",
        background: "linear-gradient(90deg, rgba(229,9,20,0) 0%, rgba(229,9,20,1) 50%, rgba(229,9,20,0) 100%)",
        borderRadius: "2px",
    }
});

const InputField = styled(TextField)({
    marginBottom: "16px",
    backgroundColor: "rgba(30, 30, 30, 0.5)",
    borderRadius: "8px",
    transition: "all 0.2s ease",

    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            borderColor: "rgba(124, 124, 124, 0.5)",
            transition: "all 0.2s",
        },
        "&:hover fieldset": {
            borderColor: "#999",
        },
        "&.Mui-focused fieldset": {
            borderColor: "#e50914",
            borderWidth: "2px",
        },
    },
    "& input": {
        color: "#fff",
        padding: "14px",
        fontWeight: "400",
    },
    "& label": {
        color: "#aaa",
    },
    "& .MuiInputLabel-root.Mui-focused": {
        color: "#e50914",
    },
    "&:hover": {
        backgroundColor: "rgba(40, 40, 40, 0.5)",
    },
});

const StyledAlert = styled(Alert)(({ severity }) => ({
    marginBottom: "16px",
    borderRadius: "8px",
    fontSize: "0.9rem",
    backgroundColor: severity === "success" ? "rgba(46, 125, 50, 0.2)" : "rgba(211, 47, 47, 0.2)",
    color: severity === "success" ? "#81c784" : "#f48fb1",
    border: `1px solid ${severity === "success" ? "rgba(46, 125, 50, 0.3)" : "rgba(211, 47, 47, 0.3)"}`,
    "& .MuiAlert-icon": {
        color: severity === "success" ? "#81c784" : "#f48fb1",
    },
}));

const SignupButton = styled(Button)(({ loading }) => ({
    width: "100%",
    padding: loading ? "8px" : "12px",
    borderRadius: "24px",
    backgroundColor: "#e50914",
    color: "#fff",
    fontSize: "1rem",
    fontWeight: "600",
    textTransform: "none",
    marginTop: "16px",
    marginBottom: "0px",
    transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
    boxShadow: "0 2px 10px rgba(229, 9, 20, 0.2)",
    "&:hover": {
        backgroundColor: "#cc0812",
        boxShadow: "0 4px 15px rgba(229, 9, 20, 0.3)",
        transform: "translateY(-1px)",
    },
    "&:active": {
        transform: "translateY(1px)",
        boxShadow: "0 1px 5px rgba(229, 9, 20, 0.2)",
    },
    "&.Mui-disabled": {
        backgroundColor: "rgba(229, 9, 20, 0.6)",
        color: "rgba(255, 255, 255, 0.7)",
    },
}));

const FormLabel = styled(Typography)({
    color: "#fff",
    textAlign: "left",
    marginBottom: "8px",
    fontWeight: 500,
    fontSize: "14px",
    opacity: 0.9,
});

const Footer = styled(Box)({
    width: "100%",
    position: "absolute",
    bottom: "0",
    textAlign: "center",
    color: "#fff",
    fontSize: "0.875rem",
    backgroundColor: "rgba(49, 2, 4, 0.95)",
    padding: "18px 0",
    backdropFilter: "blur(5px)",
    borderTop: "1px solid rgba(255, 255, 255, 0.05)",
});

declare global {
    interface Window {
        google?: {
            accounts: {
                id: {
                    initialize: (options: {
                        client_id: string;
                        callback: (response: any) => void;
                    }) => void;
                    renderButton: (
                        parent: HTMLElement,
                        options: any
                    ) => void;
                    prompt: () => void;
                };
            };
        };
    }
}

export default function Signup() {
    const router = useRouter();
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [statusMessage, setStatusMessage] = useState("");
    const [statusType, setStatusType] = useState<"success" | "error" | "">("");

    const userCredentials = {
        full_name: fullName,
        email: email,
        phone_number: phoneNumber,
        password: password,
    };

    const callCreateUser = async () => {
        if (!fullName || !email || !phoneNumber || !password) {
            setStatusMessage("Please fill in all fields");
            setStatusType("error");
            return;
        }

        setLoading(true);
        setStatusMessage("");
        setStatusType("");

        try {
            const response = await createUser(userCredentials);
            if (response.body.code === "100.000.000") {
                setStatusMessage("Account created successfully! Redirecting to login...");
                setStatusType("success");
                setTimeout(() => {
                    router.push("/auth/signin");
                }, 2000);
            } else {
                setStatusMessage("Account creation failed. Please check your details and try again.");
                setStatusType("error");
            }
        } catch (error) {
            console.error("Failed to create user:", error);
            setStatusMessage("Connection error. Please check your internet and try again.");
            setStatusType("error");
        } finally {
            setLoading(false);
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        callCreateUser();
    };

    return (
        <Wrapper>
            <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <FormContainer elevation={6}>
                    <form onSubmit={handleFormSubmit}>
                        {/* Logo */}
                        <LogoContainer>
                            <Image
                                src="/images/Logo.png"
                                alt="PlayKE Logo"
                                width={100}
                                height={48}
                                priority
                                style={{ filter: 'drop-shadow(0 0 8px rgba(229, 9, 20, 0.3))' }}
                            />
                        </LogoContainer>

                        <Typography
                            variant="h5"
                            sx={{
                                color: "#fff",
                                fontWeight: "bold",
                                mb: 2,
                                letterSpacing: "0.5px",
                                textShadow: "0 2px 4px rgba(0,0,0,0.3)"
                            }}
                        >
                            Sign up to Start Streaming
                        </Typography>

                        {statusMessage && (
                            <StyledAlert
                                severity={statusType || "error"}
                                icon={false}
                            >
                                {statusMessage}
                            </StyledAlert>
                        )}

                        {/* Form Fields */}
                        <Box sx={{ textAlign: 'left' }}>
                            <FormLabel>Full Name</FormLabel>
                            <InputField
                                fullWidth
                                variant="outlined"
                                placeholder="Enter your full name"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                required
                            />

                            <FormLabel>Email Address</FormLabel>
                            <InputField
                                fullWidth
                                variant="outlined"
                                placeholder="Enter your email address"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />

                            <FormLabel>Phone Number</FormLabel>
                            <InputField
                                fullWidth
                                variant="outlined"
                                placeholder="Enter your phone number"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                required
                            />

                            <FormLabel>Password</FormLabel>
                            <InputField
                                fullWidth
                                variant="outlined"
                                placeholder="Create a password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPassword(!showPassword)}
                                                edge="end"
                                                sx={{
                                                    color: "#fff",
                                                    opacity: 0.7,
                                                    '&:hover': {
                                                        opacity: 1,
                                                        backgroundColor: 'rgba(255, 255, 255, 0.1)'
                                                    }
                                                }}
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Box>

                        {/* Submit Button */}
                        <SignupButton
                            type="submit"
                            variant="contained"
                            disabled={loading}
                            loading={loading}
                        >
                            {loading ? (
                                <CircularProgress size={28} sx={{ color: '#ffffff' }} />
                            ) : (
                                "Create Account"
                            )}
                        </SignupButton>

                        {/* Sign in link */}
                        <Typography
                            sx={{
                                fontSize: "0.9rem",
                                mt: 4,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: 1
                            }}
                        >
                            <span style={{ color: "#aaa", fontWeight: "500" }}>
                                Already have an account?
                            </span>
                            <Link href="/auth/signin" passHref legacyBehavior>
                                <Typography
                                    component="span"
                                    sx={{
                                        color: "#fff",
                                        fontWeight: "600",
                                        cursor: "pointer",
                                        textDecoration: "none",
                                        transition: "all 0.2s",
                                        '&:hover': {
                                            color: "#e50914",
                                            textShadow: "0 0 8px rgba(229, 9, 20, 0.4)"
                                        }
                                    }}
                                >
                                    Login
                                </Typography>
                            </Link>
                        </Typography>
                    </form>
                </FormContainer>
            </Container>

            {/* Footer */}
            <Footer>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    © {new Date().getFullYear()} PlayKE. All rights reserved.
                </Typography>
            </Footer>
        </Wrapper>
    );
} 