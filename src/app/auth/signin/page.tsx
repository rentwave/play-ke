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
// import GoogleIcon from "@/app/Components/Icons/Google";
// import AppleIcon from "@/app/Components/Icons/Apple";
// import FacebookIcon from "@/app/Components/Icons/Facebook";

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
        backgroundColor: "rgba(0, 0, 0, 0)",
    },
}));
// const SocialButton = styled(Button)({
//     width: "100%",
//     padding: "10px",
//     borderRadius: "30px",
//     marginBottom: "10px",
//     textTransform: "none",
//     fontSize: "1rem",
//     backgroundColor: "#0D0D0D",
//     border: "1px solid #333",
//     color: "#fff",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     gap: "10px",
//     "&:hover": {
//         backgroundColor: "#1A1A1A",
//     },
// });

const LogoContainer = styled(Box)({
    display: "flex",
    justifyContent: "center",
    marginBottom: "15px",
});

const InputField = styled(TextField)({
    marginBottom: "5px",
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

const NextButton = styled(Button)({
    width: "100%",
    padding: "10px",
    borderRadius: "24px",
    backgroundColor: "#e50914",
    color: "#fff",
    fontSize: "1rem",
    textTransform: "none",
    marginBottom: "0px",
    "&:hover": {
        backgroundColor: "#C62828",
    },
});
// const OrDivider = styled(Divider)({
//     color: "#fff",
//     fontWeight: "bold",
//     textTransform: "uppercase",
//     margin: "10px 0",
// });

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

        setLoading(true)
        setStatusMessage("")
        setStatusType("")
        try {
            const response = await loginUser(userCredentials)
            if (response.body.code === "100.000.000") {
                const user = response.body.user_data
                setUser(user) // 👉 Set the user in Zustand store

                setStatusMessage("Login successful. Redirecting...")
                setStatusType("success")

                setTimeout(() => {
                    router.push("/home")
                }, 2000)
            } else {
                setStatusMessage("Wrong email or password.")
                setStatusType("error")
            }
        } catch (error) {
            console.error(error)
            setStatusMessage("Please check your details and try again.")
            setStatusType("error")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Wrapper>
            <FormContainer>
                <LogoContainer>
                    <Image src="/images/Logo.png" alt="PlayKE Logo" width={90} height={42} priority />
                </LogoContainer>

                <Typography variant="h5" sx={{ color: "#fff", fontWeight: "bold", mb: 0 }}>
                    Signin to PlayKE
                </Typography>
                {statusMessage && (
                    <Alert sx={{ mb: 2 }} severity={statusType || "error"}>{statusMessage}</Alert>

                )}


                {/* Auth toggle tabs */}
                <Tabs
                    value={authType}
                    onChange={(e, newValue) => setAuthType(newValue)}
                    TabIndicatorProps={{ style: { backgroundColor: "#e50914" } }}
                    centered
                >
                    <Tab
                        label="Email Address"
                        value="email"
                        sx={{
                            color: authType === "email" ? "#e50914" : "#fff",
                            textTransform: "none",
                            fontWeight: 600,
                        }}
                    />
                    <Tab
                        label="Phone Number"
                        value="phone"
                        sx={{
                            color: authType === "phone" ? "#e50914" : "#fff",
                            textTransform: "none",
                            fontWeight: 600,
                        }}
                    />
                </Tabs>


                {/* Conditionally render fields */}
                {authType === "email" ? (
                    <>
                        <Typography sx={{ color: "#fff", textAlign: "left", mb: 1, mt: 2, fontWeight: 500, fontSize: "13px" }}>
                            Email Address
                        </Typography>
                        <InputField
                            fullWidth
                            variant="outlined"
                            placeholder="Email Address"
                            InputLabelProps={{ shrink: false }}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </>
                ) : (
                    <>
                        <Typography sx={{ color: "#fff", textAlign: "left", mb: 1, mt: 2, fontWeight: 500, fontSize: "13px" }}>
                            Phone Number
                        </Typography>
                        <InputField
                            fullWidth
                            variant="outlined"
                            placeholder="Phone Number"
                            InputLabelProps={{ shrink: false }}
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </>
                )}

                {/* Password */}
                <Typography sx={{ color: "#fff", textAlign: "left", mb: 1, fontWeight: 500, fontSize: "13px" }}>Password</Typography>
                <InputField
                    fullWidth
                    variant="outlined"
                    placeholder="Password"
                    InputLabelProps={{ shrink: false }}
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setShowPassword(!showPassword)}
                                    edge="end"
                                    sx={{ color: "#fff" }}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />


                {/* Remember me + Forgot password */}
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                    <FormControlLabel
                        control={<Checkbox sx={{ color: "#7c7c7c" }} />}
                        label={<Typography sx={{ color: "#7c7c7c", fontSize: "0.875rem" }}>Remember Me</Typography>}
                    />
                    <Link href="/auth/resetpassword" passHref legacyBehavior>
                        <Typography
                            component="a"
                            sx={{ color: "#e50914", fontSize: "0.875rem", cursor: "pointer", textDecoration: "none", fontWeight: "400" }}
                        >
                            Forgot Password?
                        </Typography>
                    </Link>
                </Box>

                <NextButton onClick={callloginUser} variant="contained" disabled={loading}>
                    {loading ? (
                        <CircularProgress size="30px" sx={{ color: '#ffffff' }} />
                    ) : (
                        "Login"
                    )}</NextButton>
                {/* <OrDivider>or</OrDivider>
                <SocialButton variant="contained">
                    <GoogleIcon />
                    Login with Google
                </SocialButton>

                <SocialButton variant="contained">
                    <FacebookIcon />
                    Login with Facebook
                </SocialButton>

                <SocialButton variant="contained">
                    <AppleIcon />
                    Login with Apple
                </SocialButton> */}

                {/* Sign up link */}
                <Typography sx={{ fontSize: "0.875rem", mt: 4 }}>
                    <span style={{ color: "#7c7c7c", fontWeight: "500" }}>Don’t have an account?</span>
                    <Link href="/auth/signup" passHref legacyBehavior>
                        <Typography component="span" sx={{ color: "#fff", fontWeight: "600", ml: 1, cursor: "pointer", textDecoration: "none" }}>
                            Sign Up
                        </Typography>
                    </Link>
                </Typography>
            </FormContainer>

            <Footer>© {new Date().getFullYear()} PlayKE. All rights reserved.</Footer>
        </Wrapper >
    );
}
