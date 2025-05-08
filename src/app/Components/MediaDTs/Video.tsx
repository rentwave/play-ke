import React, { useRef, useState, useEffect } from "react";
import {
    Box,
    Typography,
    Button,
    CircularProgress,
    Chip,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Avatar,
    IconButton
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import { fetchMusic } from "@/lib/apiService";
import { useUserStore } from "@/store";
import MusicModal from "./PlayerModal";
import UploadMusicModal from "./UploadModal";
import VideoLibraryIcon from "./VideoIcon";

type VideoItem = {
    id: string;
    title: string;
    file_url: string;
    state__name: string;
    media_type: string;
    date_created: string;
};

const VideoTable: React.FC = () => {
    const [isUploadModalOpen, setUploadModalOpen] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState(false);
    const [videos, setVideos] = useState<VideoItem[]>([]);
    const user = useUserStore.getState().user;
    const [currentVideoUrl, setCurrentVideoUrl] = useState<string>("");
    const [currentTitle, setCurrentTitle] = useState<string>("");
    const [open, setOpen] = useState(false);

    const handlePlayClick = (fileUrl: string, fileTitle: string) => {
        setCurrentVideoUrl(fileUrl);
        setCurrentTitle(fileTitle);
        setOpen(true);
    };

    const handleOpenUploadModal = () => setUploadModalOpen(true);
    const handleCloseUploadModal = () => setUploadModalOpen(false);

    const data = {
        "user_id": user?.user_id,
        "media_filter": "Video",
        "draw": 1,
        "columns": [
            {
                "data": "id",
                "name": "",
                "orderable": true,
                "search": { "regex": false, "value": "" },
                "searchable": true
            },
            {
                "data": "media_type",
                "name": "video",
                "orderable": true,
                "search": { "regex": false, "value": "" },
                "searchable": true
            },
            {
                "data": "state__name",
                "name": "",
                "orderable": true,
                "search": { "regex": false, "value": "" },
                "searchable": true
            },
            {
                "data": "date_created",
                "name": "",
                "orderable": true,
                "search": { "regex": false, "value": "" },
                "searchable": true
            },
            {
                "data": "file_url",
                "name": "",
                "orderable": true,
                "search": { "regex": false, "value": "" },
                "searchable": true
            },
            {
                "data": "title",
                "name": "",
                "orderable": true,
                "search": { "regex": false, "value": "" },
                "searchable": true
            }
        ],
        "state_filter": "",
        "order": [
            {
                "column": 7,
                "dir": "DESC"
            }
        ],
        "start": 0,
        "length": 10,
        "search": {
            "value": "",
            "regex": false
        },
    };

    const fetchVideos = async () => {
        if (!user?.user_id) return;
        setLoading(true);
        try {
            const response = await fetchMusic(data);
            if (response.status_code === 200) {
                setVideos(response.body.data);
            }
        } catch (error) {
            console.error("Failed to fetch videos:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVideos();
    }, [user?.user_id]);

    return (
        <Box sx={{ width: "100%" }}>
            {/* Header with title and actions */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3,
                }}
            >
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 700,
                        color: "#fff",
                        fontSize: { xs: "1.25rem", md: "1.5rem" }
                    }}
                >
                    My Videos
                </Typography>

                <Box sx={{ display: "flex", gap: 2 }}>
                    {/* Refresh Button */}
                    <Button
                        onClick={fetchVideos}
                        variant="outlined"
                        startIcon={<RefreshIcon />}
                        sx={{
                            borderRadius: 20,
                            color: "#fff",
                            borderColor: "rgba(255, 255, 255, 0.3)",
                            backgroundColor: "rgba(255, 255, 255, 0.05)",
                            '&:hover': {
                                backgroundColor: "rgba(255, 255, 255, 0.1)",
                                borderColor: "#fff",
                            },
                            typography: "body2",
                            textTransform: "none",
                            fontWeight: 600,
                            display: { xs: "none", sm: "flex" }
                        }}
                    >
                        Refresh
                    </Button>

                    {/* Mobile-only refresh icon */}
                    <IconButton
                        onClick={fetchVideos}
                        sx={{
                            color: "#fff",
                            display: { xs: "flex", sm: "none" },
                            backgroundColor: "rgba(255, 255, 255, 0.05)",
                            '&:hover': { backgroundColor: "rgba(255, 255, 255, 0.1)" }
                        }}
                    >
                        <RefreshIcon />
                    </IconButton>

                    {/* Upload Button */}
                    <Button
                        onClick={handleOpenUploadModal}
                        variant="contained"
                        startIcon={<AddTwoToneIcon />}
                        sx={{
                            borderRadius: 20,
                            backgroundColor: "#E50914", // Netflix red
                            color: "#fff",
                            '&:hover': {
                                backgroundColor: "#B8070E", // Darker red on hover
                            },
                            typography: "body2",
                            textTransform: "none",
                            fontWeight: 600,
                            boxShadow: 2,
                            display: { xs: "none", sm: "flex" }
                        }}
                    >
                        Upload Video
                    </Button>

                    {/* Mobile-only upload icon */}
                    <IconButton
                        onClick={handleOpenUploadModal}
                        sx={{
                            color: "#fff",
                            display: { xs: "flex", sm: "none" },
                            backgroundColor: "#E50914",
                            '&:hover': { backgroundColor: "#B8070E" }
                        }}
                    >
                        <AddTwoToneIcon />
                    </IconButton>
                </Box>
            </Box>

            {/* Content area */}
            <Box
                sx={{
                    backgroundColor: "#1A1A1A",
                    borderRadius: 3,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    overflow: "hidden",
                    p: { xs: 1, sm: 2 }
                }}
            >
                {loading ? (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: 630,
                            width: "100%"
                        }}
                    >
                        <CircularProgress size={40} sx={{ color: "#E50914" }} />
                    </Box>
                ) : videos.length === 0 ? (
                    <Box
                        sx={{
                            width: "100%",
                            height: 630,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            textAlign: "center",
                            p: 3,
                        }}
                    >
                        <Box sx={{ mb: 2, color: "rgba(255,255,255,0.7)" }}>
                            <VideoLibraryIcon sx={{ fontSize: 48 }} />
                        </Box>

                        <Typography variant="h6" sx={{ color: "#fff", mb: 1 }}>
                            No videos yet
                        </Typography>

                        <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)", mb: 3, maxWidth: 450 }}>
                            Upload your first video to start sharing with your audience. Supported formats include MP4, MOV, and AVI.
                        </Typography>

                        <Button
                            variant="contained"
                            startIcon={<AddTwoToneIcon />}
                            onClick={handleOpenUploadModal}
                            sx={{
                                borderRadius: 20,
                                backgroundColor: "#E50914",
                                color: "#fff",
                                '&:hover': {
                                    backgroundColor: "#B8070E",
                                },
                                typography: "body2",
                                textTransform: "none",
                                fontWeight: 600,
                                px: 3,
                                py: 1
                            }}
                        >
                            Upload Your First Video
                        </Button>

                        <input
                            type="file"
                            accept="video/*"
                            style={{ display: "none" }}
                            ref={fileInputRef}
                        />
                    </Box>
                ) : (
                    <TableContainer component={Paper} sx={{ backgroundColor: "transparent", boxShadow: "none" }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    {["", "Title", "Upload Date", "Type", "Status"].map((header) => (
                                        <TableCell
                                            key={header}
                                            sx={{
                                                color: "rgba(255,255,255,0.7)",
                                                borderBottom: "1px solid rgba(255,255,255,0.1)",
                                                py: 2,
                                                fontSize: "0.875rem",
                                                fontWeight: 600
                                            }}
                                        >
                                            {header}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {videos.map((video) => (
                                    <TableRow
                                        key={video.id}
                                        sx={{
                                            '&:hover': { backgroundColor: "rgba(255,255,255,0.03)" },
                                            transition: "background-color 0.2s"
                                        }}
                                    >
                                        <TableCell
                                            sx={{
                                                borderBottom: "1px solid rgba(255,255,255,0.05)",
                                                width: 60,
                                                py: 1.5
                                            }}
                                        >
                                            <IconButton
                                                onClick={() => handlePlayClick(video.file_url, video.title)}
                                                sx={{
                                                    backgroundColor: "rgba(229,9,20,0.1)",
                                                    '&:hover': { backgroundColor: "rgba(229,9,20,0.2)" },
                                                    color: "#E50914",
                                                    transition: "all 0.2s"
                                                }}
                                                size="small"
                                                aria-label="play video"
                                            >
                                                <PlayArrowIcon />
                                            </IconButton>
                                        </TableCell>

                                        <TableCell
                                            sx={{
                                                color: "#fff",
                                                borderBottom: "1px solid rgba(255,255,255,0.05)",
                                                py: 1.5,
                                                fontWeight: 500
                                            }}
                                        >
                                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                                <Avatar
                                                    variant="rounded"
                                                    sx={{
                                                        width: 48,
                                                        height: 36,
                                                        backgroundColor: "#333",
                                                        mr: 2,
                                                        display: { xs: "none", sm: "flex" }
                                                    }}
                                                >
                                                    <VideoLibraryIcon sx={{ fontSize: 18, opacity: 0.8 }} />
                                                </Avatar>
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        fontWeight: 500,
                                                        overflow: "hidden",
                                                        textOverflow: "ellipsis",
                                                        whiteSpace: "nowrap",
                                                        maxWidth: { xs: 120, sm: 200, md: 300 }
                                                    }}
                                                >
                                                    {video.title}
                                                </Typography>
                                            </Box>
                                        </TableCell>

                                        <TableCell
                                            sx={{
                                                color: "rgba(255,255,255,0.7)",
                                                borderBottom: "1px solid rgba(255,255,255,0.05)",
                                                py: 1.5,
                                                fontSize: "0.875rem"
                                            }}
                                        >
                                            {new Date(video.date_created).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                        </TableCell>

                                        <TableCell
                                            sx={{
                                                color: "rgba(255,255,255,0.7)",
                                                borderBottom: "1px solid rgba(255,255,255,0.05)",
                                                py: 1.5,
                                                fontSize: "0.875rem"
                                            }}
                                        >
                                            {video.media_type}
                                        </TableCell>

                                        <TableCell
                                            sx={{
                                                borderBottom: "1px solid rgba(255,255,255,0.05)",
                                                py: 1.5
                                            }}
                                        >
                                            <Chip
                                                label={video.state__name === "Active" ? "Public" : "Private"}
                                                size="small"
                                                sx={{
                                                    backgroundColor: video.state__name === "Active"
                                                        ? "rgba(0,200,83,0.1)"
                                                        : "rgba(229,9,20,0.1)",
                                                    color: video.state__name === "Active" ? "#00C853" : "#E50914",
                                                    fontWeight: 600,
                                                    fontSize: "0.75rem",
                                                    height: 24
                                                }}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Box>

            {/* Modals */}
            <UploadMusicModal
                open={isUploadModalOpen}
                handleClose={handleCloseUploadModal}
            />

            <MusicModal
                open={open}
                onClose={() => setOpen(false)}
                audioUrl={currentVideoUrl}
                title={currentTitle}
            />
        </Box>
    );
};

export default VideoTable;