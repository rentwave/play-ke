"use client";
import { useState } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    FormControlLabel,
    Checkbox,
    Tabs,
    Tab,
    Alert,
    Container,
    Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import Image from "next/image";
import { IconButton, InputAdornment, CircularProgress } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { loginUser } from "@/lib/apiService";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store";

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

const StyledTabs = styled(Tabs)({
    marginBottom: "24px",
    "& .MuiTabs-indicator": {
        backgroundColor: "#e50914",
        height: "3px",
        borderRadius: "3px",
    },
});

const StyledTab = styled(Tab)(({ theme, selected }) => ({
    color: selected ? "#e50914" : "#fff",
    textTransform: "none",
    fontWeight: 600,
    fontSize: "16px",
    letterSpacing: "0.3px",
    transition: "all 0.2s",
    opacity: selected ? 1 : 0.7,
    "&:hover": {
        opacity: 1,
        backgroundColor: "rgba(229, 9, 20, 0.08)",
    },
    [theme.breakpoints.down("sm")]: {
        fontSize: "14px",
    },
}));

const NextButton = styled(Button)(({ loading }) => ({
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

const StyledCheckbox = styled(Checkbox)({
    color: "#7c7c7c",
    "&.Mui-checked": {
        color: "#e50914",
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

export default function Setpassword() {
    const [authType, setAuthType] = useState<"email" | "phone">("email");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const userCredentials = { "phone_number": phoneNumber, "email": email, "password": password };
    const [loading, setLoading] = useState(false);
    const [statusMessage, setStatusMessage] = useState("");
    const [statusType, setStatusType] = useState<"success" | "error" | "">(""); // "" means no message
    const router = useRouter();
    const setUser = useUserStore.getState().setUser

    const callloginUser = async () => {
        setLoading(true);
        setStatusMessage("");
        setStatusType("");

        try {
            const response = await loginUser(userCredentials);
            if (response.body.code === "100.000.000") {
                const user = response.body.user_data;
                setUser(user); // 👉 Set the user in Zustand store

                setStatusMessage("Login successful! Redirecting you to your dashboard...");
                setStatusType("success");

                setTimeout(() => {
                    router.push("/home");
                }, 2000);
            } else {
                setStatusMessage("Invalid credentials. Please check your email/phone and password.");
                setStatusType("error");
            }
        } catch (error) {
            console.error(error);
            setStatusMessage("Connection error. Please check your internet and try again.");
            setStatusType("error");
        } finally {
            setLoading(false);
        }
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        callloginUser();
    };

    return (
        <Wrapper>
            <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <FormContainer elevation={6}>
                    <form onSubmit={handleFormSubmit}>
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
                            Sign in to PlayKE
                        </Typography>

                        {statusMessage && (
                            <StyledAlert
                                severity={statusType || "error"}
                                icon={false}
                            >
                                {statusMessage}
                            </StyledAlert>
                        )}

                        {/* Auth toggle tabs */}
                        <StyledTabs
                            value={authType}
                            onChange={(e, newValue) => setAuthType(newValue)}
                            centered
                        >
                            <StyledTab
                                label="Email Address"
                                value="email"
                                selected={authType === "email"}
                            />
                            <StyledTab
                                label="Phone Number"
                                value="phone"
                                selected={authType === "phone"}
                            />
                        </StyledTabs>

                        {/* Conditionally render fields */}
                        {authType === "email" ? (
                            <>
                                <Typography
                                    sx={{
                                        color: "#fff",
                                        textAlign: "left",
                                        mb: 1,
                                        fontWeight: 500,
                                        fontSize: "14px",
                                        opacity: 0.9,
                                    }}
                                >
                                    Email Address
                                </Typography>
                                <InputField
                                    fullWidth
                                    variant="outlined"
                                    placeholder="Enter your email address"
                                    InputLabelProps={{ shrink: false }}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </>
                        ) : (
                            <>
                                <Typography
                                    sx={{
                                        color: "#fff",
                                        textAlign: "left",
                                        mb: 1,
                                        fontWeight: 500,
                                        fontSize: "14px",
                                        opacity: 0.9,
                                    }}
                                >
                                    Phone Number
                                </Typography>
                                <InputField
                                    fullWidth
                                    variant="outlined"
                                    placeholder="Enter your phone number"
                                    InputLabelProps={{ shrink: false }}
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    required
                                />
                            </>
                        )}

                        {/* Password */}
                        <Typography
                            sx={{
                                color: "#fff",
                                textAlign: "left",
                                mb: 1,
                                fontWeight: 500,
                                fontSize: "14px",
                                opacity: 0.9,
                            }}
                        >
                            Password
                        </Typography>
                        <InputField
                            fullWidth
                            variant="outlined"
                            placeholder="Enter your password"
                            InputLabelProps={{ shrink: false }}
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

                        {/* Remember me + Forgot password */}
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                width: "100%",
                                mb: 1,
                            }}
                        >
                            <FormControlLabel
                                control={<StyledCheckbox />}
                                label={
                                    <Typography
                                        sx={{
                                            color: "#aaa",
                                            fontSize: "0.875rem",
                                            transition: "color 0.2s",
                                            '&:hover': {
                                                color: "#fff"
                                            }
                                        }}
                                    >
                                        Remember Me
                                    </Typography>
                                }
                            />
                            <Link href="/auth/resetpassword" passHref legacyBehavior>
                                <Typography
                                    component="a"
                                    sx={{
                                        color: "#e50914",
                                        fontSize: "0.875rem",
                                        cursor: "pointer",
                                        textDecoration: "none",
                                        fontWeight: "500",
                                        transition: "all 0.2s",
                                        '&:hover': {
                                            textDecoration: "underline",
                                            textShadow: "0 0 8px rgba(229, 9, 20, 0.4)"
                                        }
                                    }}
                                >
                                    Forgot Password?
                                </Typography>
                            </Link>
                        </Box>

                        <NextButton
                            type="submit"
                            variant="contained"
                            disabled={loading}
                            loading={loading}
                        >
                            {loading ? (
                                <CircularProgress size={28} sx={{ color: '#ffffff' }} />
                            ) : (
                                "Sign In"
                            )}
                        </NextButton>

                        {/* Sign up link */}
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
                                Don't have an account?
                            </span>
                            <Link href="/auth/signup" passHref legacyBehavior>
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
                                    Sign Up
                                </Typography>
                            </Link>
                        </Typography>
                    </form>
                </FormContainer>
            </Container>

            <Footer>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    © {new Date().getFullYear()} PlayKE. All rights reserved.
                </Typography>
            </Footer>
        </Wrapper>
    );
}