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

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

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
          // backgroundColor: "#fbfcfc",
          background:
            "linear-gradient(to bottom right, #f5f5f5, #f5f5f5, #f5f5f5, #f5f5f5, #f5f5f5, #FFE4EB)",
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
            Hi, Welcome
          </Typography>
          <Typography
            variant="subtitle1"
            color="#637381"
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
            maxWidth: 600, // Increased width
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
            Sign in to your account
          </Typography>

          {/* Sign Up Link */}
          <Typography
            variant="subtitle1"
            sx={{
              color: "#637381",
              mb: 6,
              fontWeight: "400",
              fontSize: "16px",
            }}
          >
            Don’t have an account?{" "}
            <Link
              href="/auth/login"
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
            label="Company Name"
            placeholder=""
            defaultValue="eg. Jolt Ltd"
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
          <TextField
            required
            label="Contact Email Address"
            placeholder=""
            defaultValue="eg. jolt@jolt.co"
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
          <TextField
            required
            label="Phone Number"
            placeholder=""
            defaultValue="eg. 2547*****"
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
          {/* <TextField
            required
            label="Customer Support Email Address"
            placeholder=""
            defaultValue="eg. support@jolt.co"
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
          /> */}

          {/* Password Input with Toggle */}
          <TextField
            required
            label="Set Password"
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
          <TextField
            required
            label="Confirm Password"
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
