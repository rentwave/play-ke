import React from "react";
import { Modal, Box, IconButton, Typography, Backdrop, Fade } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const style = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    height: 250,
    bgcolor: "transparent",
    border: "none",
    boxShadow: 24,
    borderRadius: 2,
    p: 0,
    outline: "none",
};

interface MusicModalProps {
    open: boolean;
    onClose: () => void;
    audioUrl: string;
    title: string;
}

const MusicModal: React.FC<MusicModalProps> = ({ open, onClose, audioUrl, title }) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={open}>
                <Box sx={style}>
                    <Box
                        sx={{
                            width: "100%",
                            height: "100%",
                            borderRadius: 2,
                            p: 4,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            background: `linear-gradient(to bottom right, #E50914 0%, #008100 20%, #1A1A1A 80%)`,
                            color: "#fff",
                            position: "relative",
                        }}
                    >
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                            <Typography variant="h5" fontWeight="bold">{title} Playing</Typography>
                            <IconButton onClick={onClose} sx={{ color: "#fff" }}>
                                <CloseIcon />
                            </IconButton>
                        </Box>
                        <audio controls autoPlay style={{ width: "100%" }}>
                            <source src={audioUrl} type="audio/mpeg" />
                            Your browser does not support the audio element.
                        </audio>
                    </Box>
                </Box>
            </Fade>
        </Modal>
    );
};

export default MusicModal;
