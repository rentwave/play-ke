"use client";

import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const FooterWrapper = styled(Box)({
    backgroundColor: "#000",
    color: "#fff",
    textAlign: "center",
    padding: "18px 0",
    marginTop: "auto",
});

export default function Footer() {
    return (
        <FooterWrapper>
            <Typography variant="body2">
                © {new Date().getFullYear()} Play KE ™ . All rights reserved.
            </Typography>
        </FooterWrapper>
    );
}
