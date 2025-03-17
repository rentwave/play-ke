"use client";

import {
  Grid,
  Typography,
  TextField,
  Button,
  Paper,
  Link,
  Box,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useState } from "react";
import { RemoveRedEyeTwoTone, VisibilityOffTwoTone } from "@mui/icons-material";
import EyeIcon from "@/app/Components/SVGs/Eye";
import CustomTextField from "@/app/Components/InputFields/TextField";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("eg. johndoe@gmail.com");

  return (
    <Grid container sx={{ height: "100vh" }}>
      {/* Left Section - Logo & Background */}
      {/* Left Section - Logo & Background */}
      <Grid
        item
        xs={12}
        md={4}
        sx={{
          position: "relative",
          backgroundImage: "url('/background.jpg')", // Replace with your actual image
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "#fbfcfc",
          color: "white",
          p: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ color: "#800020", position: "absolute", top: 20, left: 20 }}
        >
          Sirocco
        </Typography>

        {/* Welcome Message */}
        <Box sx={{ mt: 10 }}>
          <Typography
            variant="h4"
            component="h3"
            fontWeight="bold"
            color="black"
          >
            Hi, Welcome Back
          </Typography>
          <Typography
            variant="subtitle1"
            color="#6b7a87"
            sx={{ mt: 3, fontSize: "18px" }}
          >
            Sirocco for the best customer support assistant
          </Typography>

          {/* Centered Image */}
          <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
            <img
              src="/images/signin.png"
              alt="Welcome"
              style={{ maxWidth: "80%", height: "auto" }}
            />
          </Box>
        </Box>
      </Grid>

      {/* Right Section - Login Form */}
      <Grid
        item
        xs={12}
        md={8}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "white",
        }}
      >
        <Paper
          elevation={0} // No shadow or border
          sx={{
            width: "100%",
            maxWidth: 500, // Increased width
            p: 5,
            borderRadius: "10px",
          }}
        >
          {/* Sign In Header */}
          <Typography
            variant="h6"
            fontWeight={600}
            sx={{ color: "black", mb: 2 }}
          >
            Signup to continue
          </Typography>

          {/* Sign Up Link */}
          <Typography
            variant="subtitle1"
            sx={{
              color: "#6b7a87",
              mb: 6,
              fontWeight: "400",
              fontSize: "16px",
            }}
          >
            Don't have an account?{" "}
            <Link
              href="/auth/signup"
              sx={{
                color: "#800020",
                fontWeight: 500,
                textDecoration: "none",
                "&:hover": { color: "#660018" },
              }}
            >
              Get started
            </Link>
          </Typography>

          {/* Email Input */}
          <TextField
            required
            label="Email Address"
            placeholder="Enter your email"
            defaultValue="eg. johndoe@gmail.com"
            fullWidth
            sx={{
              mb: 4,
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                "& fieldset": { borderColor: "#eeeeee" }, // Softer grey border
                "&:hover fieldset": { borderColor: "#800020" },
                "&.Mui-focused fieldset": { borderColor: "#800020" },
              },
            }}
          />
          <CustomTextField
            label="Email Address"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Forgot Password & Password Input */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box /> {/* Empty space for alignment */}
            <Link
              href="/forgot-password"
              sx={{
                color: "#1c252e",
                fontSize: "0.875rem",
                fontWeight: 500,
                textDecoration: "none",
                "&:hover": { color: "#660018", textDecoration: "underline" },
              }}
            >
              Forgot password?
            </Link>
          </Box>

          {/* Password Input with Toggle */}
          <TextField
            required
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            fullWidth
            sx={{
              mt: 1,
              mb: 3,
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                "& fieldset": { borderColor: "#eeeeee" },
                "&:hover fieldset": { borderColor: "#800020" },
                "&.Mui-focused fieldset": { borderColor: "#800020" },
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((prev) => !prev)}
                    edge="end"
                  >
                    {showPassword ? <EyeIcon /> : <RemoveRedEyeTwoTone />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Sign In Button */}
          <Button
            variant="contained"
            fullWidth
            size="large"
            sx={{
              bgcolor: "#1c252e",
              textTransform: "none", // Keeps "Sign In" capitalized, not all uppercase
              fontSize: "1.1rem",
              py: 1.3, // Increases button height
              borderRadius: "10px", // More rounded corners
              "&:hover": { bgcolor: "#660018" },
            }}
          >
            Sign In
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Login;
