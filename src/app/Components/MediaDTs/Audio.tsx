import React, { useRef, useState, useEffect } from "react";
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Avatar, IconButton,
    Typography, Button, Box, CircularProgress, Chip
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { fetchMusic } from "@/lib/apiService";
import { useUserStore } from "@/store";
import MusicModal from "./PlayerModal";
type MusicItem = {
    id: string;
    title: string;
    file_url: string;
    state__name: string;
    media_type: string;
    date_created: string;
};

const MusicTable: React.FC = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState(false);
    const [music, setMusic] = useState<MusicItem[]>([]);
    // const [statusMessage, setStatusMessage] = useState("");
    const user = useUserStore.getState().user
    const [currentAudioUrl, setCurrentAudioUrl] = useState<string>("");
    const [currentTitle, setCurrentTitle] = useState<string>("");
    const [open, setOpen] = useState(false);
    const handlePlayClick = (fileUrl: string, fileTitle: string) => {
        setCurrentAudioUrl(fileUrl);
        setCurrentTitle(fileTitle)
        setOpen(true);
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };
    useEffect(() => {
        const data = {
            "user_id": user?.user_id,
            "draw": 1,
            "columns": [
                {
                    "data": "id",
                    "name": "",
                    "orderable": true,
                    "search": {
                        "regex": false,
                        "value": ""
                    },
                    "searchable": true
                },
                {
                    "data": "media_type",
                    "name": "",
                    "orderable": true,
                    "search": {
                        "regex": false,
                        "value": ""
                    },
                    "searchable": true
                },
                {
                    "data": "state__name",
                    "name": "",
                    "orderable": true,
                    "search": {
                        "regex": false,
                        "value": ""
                    },
                    "searchable": true
                },
                {
                    "data": "date_created",
                    "name": "",
                    "orderable": true,
                    "search": {
                        "regex": false,
                        "value": ""
                    },
                    "searchable": true
                },
                {
                    "data": "file_url",
                    "name": "",
                    "orderable": true,
                    "search": {
                        "regex": false,
                        "value": ""
                    },
                    "searchable": true
                },
                {
                    "data": "title",
                    "name": "",
                    "orderable": true,
                    "search": {
                        "regex": false,
                        "value": ""
                    },
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
        }
        const callFetchMusic = async () => {
            if (!user?.user_id) return

            setLoading(true)
            try {
                const response = await fetchMusic(data)
                if (response.status_code === 200) {
                    console.log("artist response", response)
                    setMusic(response.body.data)
                } else {
                    // setStatusMessage("An error occurred")
                }
            } catch (error) {
                console.error(error)
                // setStatusMessage("An unexpected error occurred")
            } finally {
                setLoading(false)
            }
        }

        callFetchMusic()
    }, [user?.user_id])

    return (
        <Box>
            {loading ? (<Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 300,
                    backgroundColor: "#1A1A1A",
                    borderRadius: 2,
                    boxShadow: 3,
                }}
            >
                <CircularProgress size={40} sx={{ color: "#fff" }} />
            </Box>) : music.length === 0 ? (
                <Box
                    sx={{
                        textAlign: "center",
                        p: 40,
                        borderRadius: 2,
                        backgroundColor: "#1A1A1A",
                        boxShadow: 1,
                    }}
                >
                    <Typography variant="body2" gutterBottom>
                        No music uploaded
                    </Typography>
                    <Button
                        variant="outlined"
                        sx={{
                            color: "#000",
                            borderColor: "#ccc",
                            backgroundColor: "#fff",
                            '&:hover': {
                                backgroundColor: "#f1f1f1",
                            },
                        }}
                        onClick={handleUploadClick}
                    >
                        <Typography variant="body2" sx={{ textTransform: "none", fontWeight: "600" }}>Upload Music</Typography>
                    </Button>
                    <input
                        type="file"
                        accept="audio/*"
                        style={{ display: "none" }}
                        ref={fileInputRef}
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                console.log("Selected file:", file.name);
                            }
                        }}
                    />
                </Box>
            ) : (
                <TableContainer
                    component={Paper}
                    sx={{
                        borderRadius: 2,
                        boxShadow: 3,
                        backgroundColor: "#1A1A1A",
                    }}
                >
                    <Table>
                        <TableHead>
                            <TableRow sx={{ borderBottom: "1px solid #373737" }}>
                                {["Play", "Title", "Upload Date", "Media Type", "Visibility"].map((header) => (
                                    <TableCell
                                        key={header}
                                        sx={{ color: "#fff", borderBottom: "none" }} // removes individual cell borders
                                    >
                                        {header}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {music.map((music) => (
                                <TableRow
                                    key={music?.id}
                                    sx={{
                                        borderBottom: "1px dashed #373737",
                                        "&:last-child": { borderBottom: "none" },
                                    }}
                                >
                                    <TableCell sx={{ color: "#fff", borderBottom: "none" }}>
                                        {/* <Avatar
                                            src="https://i1.sndcdn.com/artworks-000161197658-gzvj7z-t500x500.jpg"
                                            variant="rounded"
                                            sx={{ mr: 1, bgcolor: "#333" }}
                                        >
                                            <IconButton sx={{ color: "#fff" }}>
                                                <PlayArrowIcon />
                                            </IconButton>
                                        </Avatar> */}
                                        <Avatar src="" sx={{ mr: 1, bgcolor: "#333" }}>
                                            <IconButton sx={{ color: "#fff" }} onClick={() => handlePlayClick(music.file_url, music.title)}>
                                                <PlayArrowIcon />
                                            </IconButton>
                                        </Avatar>
                                    </TableCell>
                                    <TableCell sx={{ color: "#fff", borderBottom: "none" }}>{music.title}</TableCell>
                                    <TableCell sx={{ color: "#fff", borderBottom: "none" }}>{music.date_created}</TableCell>
                                    <TableCell sx={{ color: "#fff", borderBottom: "none" }}>{music.media_type}</TableCell>
                                    <TableCell sx={{ borderBottom: "none" }}>
                                        <Chip
                                            label={music.state__name === "Active" ? "Visible" : "Hidden"}
                                            sx={{
                                                backgroundColor: music.state__name === "Active" ? "#00C853" : "#E50914", // green or Netflix red
                                                color: "#fff",
                                                fontWeight: 600,
                                            }}
                                            size="small"
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>

                    </Table>
                </TableContainer>

            )}
            <MusicModal
                open={open}
                onClose={() => setOpen(false)}
                audioUrl={currentAudioUrl}
                title={currentTitle}
            />

        </Box>
    );
};

export default MusicTable;
