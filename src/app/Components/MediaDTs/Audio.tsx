import React, { useRef, useState, useEffect } from "react";
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Avatar, IconButton,
    Typography, Button, Box, CircularProgress, Chip,
    alpha, useMediaQuery, Tooltip, Menu, MenuItem, ListItemIcon
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { fetchMusic } from "@/lib/apiService";
import { useUserStore } from "@/store";
import MusicModal from "./PlayerModal";
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import UploadMusicModal from "./UploadModal";
import RefreshIcon from '@mui/icons-material/Refresh';
import DownloadIcon from "./AudioIcon";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import EditIcon from '@mui/icons-material/Edit';
import GetAppIcon from '@mui/icons-material/GetApp';
import DeleteIcon from '@mui/icons-material/Delete';

type MusicItem = {
    id: string;
    title: string;
    file_url: string;
    state__name: string;
    media_type: string;
    date_created: string;
};

const MusicTable: React.FC = () => {
    const [isUploadModalOpen, setUploadModalOpen] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState(false);
    const [music, setMusic] = useState<MusicItem[]>([]);
    const user = useUserStore.getState().user;
    const [currentAudioUrl, setCurrentAudioUrl] = useState<string>("");
    const [currentTitle, setCurrentTitle] = useState<string>("");
    const [open, setOpen] = useState(false);
    const [currentPlaying, setCurrentPlaying] = useState<string | null>(null);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedMusicId, setSelectedMusicId] = useState<string | null>(null);

    const isMobile = useMediaQuery('(max-width:600px)');
    const isTablet = useMediaQuery('(max-width:960px)');

    const handlePlayClick = (id: string, fileUrl: string, fileTitle: string) => {
        if (currentPlaying === id) {
            setCurrentPlaying(null);
            setOpen(false);
        } else {
            setCurrentPlaying(id);
            setCurrentAudioUrl(fileUrl);
            setCurrentTitle(fileTitle);
            setOpen(true);
        }
    };

    const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>, musicId: string) => {
        setAnchorEl(event.currentTarget);
        setSelectedMusicId(musicId);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedMusicId(null);
    };

    const handleOpenUploadModal = () => setUploadModalOpen(true);
    const handleCloseUploadModal = () => setUploadModalOpen(false);

    // Format date to be more readable
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    };

    const data = {
        "user_id": user?.user_id,
        "media_filter": "Audio",
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
                "name": "audio",
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
    };

    const callFetchMusic = async () => {
        if (!user?.user_id) return;

        setLoading(true);
        try {
            const response = await fetchMusic(data);
            if (response.status_code === 200) {
                console.log("artist response", response);
                setMusic(response.body.data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        callFetchMusic();
    }, [user?.user_id]);

    return (
        <>
            {/* Header with action buttons */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                    px: { xs: 2, sm: 3 },
                    py: 2,
                    backgroundColor: alpha("#1A1A1A", 0.8),
                    borderRadius: 3,
                    backdropFilter: "blur(10px)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                    border: "1px solid rgba(255,255,255,0.05)",
                }}
            >
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 600,
                        color: "#fff",
                        fontSize: { xs: '1.1rem', sm: '1.3rem' }
                    }}
                >
                    Your Music Library
                </Typography>

                <Box sx={{ display: "flex", gap: 1 }}>
                    {/* Refresh Button */}
                    <Tooltip title="Refresh Content">
                        <Button
                            onClick={callFetchMusic}
                            variant="outlined"
                            size={isMobile ? "small" : "medium"}
                            sx={{
                                borderRadius: 8,
                                color: "#fff",
                                borderColor: "rgba(255,255,255,0.3)",
                                backgroundColor: "rgba(255,255,255,0.05)",
                                '&:hover': {
                                    backgroundColor: "rgba(255,255,255,0.1)",
                                    borderColor: "rgba(255,255,255,0.5)",
                                },
                                display: "flex",
                                alignItems: "center",
                                minWidth: { xs: 0, sm: "auto" },
                                px: { xs: 1.5, sm: 2 },
                                py: { xs: 0.7, sm: 1 },
                            }}
                        >
                            <RefreshIcon fontSize={isMobile ? "small" : "medium"} sx={{ mr: { xs: 0, sm: 1 } }} />
                            <Typography
                                variant="body2"
                                sx={{
                                    display: { xs: "none", sm: "block" },
                                    textTransform: "none",
                                    fontWeight: 500,
                                }}
                            >
                                Refresh
                            </Typography>
                        </Button>
                    </Tooltip>

                    {/* Upload Button */}
                    <Button
                        onClick={handleOpenUploadModal}
                        variant="contained"
                        size={isMobile ? "small" : "medium"}
                        sx={{
                            borderRadius: 8,
                            color: "#000",
                            backgroundColor: "#fff",
                            '&:hover': {
                                backgroundColor: alpha("#ffffff", 0.9),
                            },
                            display: "flex",
                            alignItems: "center",
                            minWidth: { xs: 0, sm: "auto" },
                            px: { xs: 1.5, sm: 2 },
                            py: { xs: 0.7, sm: 1 },
                            boxShadow: "0 2px 10px rgba(255,255,255,0.2)",
                        }}
                    >
                        <AddTwoToneIcon fontSize={isMobile ? "small" : "medium"} sx={{ mr: { xs: 0, sm: 1 } }} />
                        <Typography
                            variant="body2"
                            sx={{
                                display: { xs: "none", sm: "block" },
                                textTransform: "none",
                                fontWeight: 600,
                            }}
                        >
                            Upload New
                        </Typography>
                    </Button>
                </Box>
            </Box>

            <Box>
                {loading ? (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: 630,
                            backgroundColor: alpha("#1A1A1A", 0.8),
                            backdropFilter: "blur(10px)",
                            borderRadius: 4,
                            boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                            border: "1px solid rgba(255,255,255,0.05)",
                        }}
                    >
                        <CircularProgress size={40} sx={{ color: "#fff" }} />
                    </Box>
                ) : music.length === 0 ? (
                    <Box
                        sx={{
                            width: "100%",
                            height: 630,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 4,
                            backgroundColor: alpha("#1A1A1A", 0.8),
                            backdropFilter: "blur(10px)",
                            boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                            border: "1px solid rgba(255,255,255,0.05)",
                            textAlign: "center",
                            p: 3,
                        }}
                    >
                        <DownloadIcon sx={{ fontSize: 60, color: "rgba(255,255,255,0.5)", mb: 2 }} />

                        <Typography variant="h6" sx={{ color: "#fff", fontWeight: 500, mb: 1 }}>
                            Your music collection is empty
                        </Typography>

                        <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)", mb: 3, maxWidth: 400 }}>
                            Upload your first audio track to start building your music library
                        </Typography>

                        <Button
                            variant="contained"
                            sx={{
                                color: "#000",
                                backgroundColor: "#fff",
                                '&:hover': {
                                    backgroundColor: alpha("#ffffff", 0.9),
                                },
                                borderRadius: 8,
                                px: 3,
                                py: 1,
                                boxShadow: "0 2px 10px rgba(255,255,255,0.2)",
                            }}
                            onClick={handleOpenUploadModal}
                        >
                            <AddTwoToneIcon sx={{ mr: 1 }} />
                            <Typography variant="body2" sx={{ textTransform: "none", fontWeight: 600 }}>
                                Upload Music
                            </Typography>
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
                            borderRadius: 3,
                            boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                            backgroundColor: alpha("#1A1A1A", 0.8),
                            backdropFilter: "blur(10px)",
                            border: "1px solid rgba(255,255,255,0.05)",
                            overflow: "hidden",
                        }}
                    >
                        <Table>
                            <TableHead>
                                <TableRow
                                    sx={{
                                        borderBottom: "1px solid rgba(255,255,255,0.1)",
                                        background: "rgba(0,0,0,0.2)"
                                    }}
                                >
                                    {[
                                        { width: "60px", label: "" },
                                        { width: "auto", label: "Title" },
                                        ...(isMobile
                                            ? [{ width: "60px", label: "" }]
                                            : [
                                                { width: isTablet ? "150px" : "180px", label: "Upload Date" },
                                                { width: "120px", label: "Media Type" },
                                                { width: "120px", label: "Visibility" }
                                            ]
                                        )
                                    ].map((column, index) => (
                                        <TableCell
                                            key={index}
                                            sx={{
                                                color: "rgba(255,255,255,0.7)",
                                                borderBottom: "none",
                                                fontSize: "0.8rem",
                                                fontWeight: 500,
                                                letterSpacing: "0.5px",
                                                textTransform: "uppercase",
                                                p: isMobile ? 1.5 : 2,
                                                width: column.width
                                            }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {music.map((item) => (
                                    <TableRow
                                        key={item?.id}
                                        sx={{
                                            borderBottom: "1px solid rgba(255,255,255,0.05)",
                                            "&:last-child": { borderBottom: "none" },
                                            "&:hover": {
                                                backgroundColor: "rgba(255,255,255,0.05)",
                                                transition: "all 0.2s ease"
                                            },
                                            transition: "all 0.2s ease"
                                        }}
                                    >
                                        <TableCell
                                            sx={{
                                                borderBottom: "none",
                                                p: isMobile ? 1.5 : 2
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    width: 40,
                                                    height: 40,
                                                    borderRadius: "50%",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    backgroundColor: currentPlaying === item.id
                                                        ? "rgba(29, 185, 84, 0.2)"
                                                        : "rgba(255, 255, 255, 0.1)",
                                                    transition: "all 0.3s ease",
                                                    border: currentPlaying === item.id
                                                        ? "1px solid rgba(29, 185, 84, 0.5)"
                                                        : "1px solid rgba(255, 255, 255, 0.1)"
                                                }}
                                            >
                                                <IconButton
                                                    size="small"
                                                    onClick={() => handlePlayClick(item.id, item.file_url, item.title)}
                                                    sx={{
                                                        color: currentPlaying === item.id ? "#1DB954" : "#fff",
                                                        '&:hover': {
                                                            color: "#1DB954",
                                                        },
                                                    }}
                                                >
                                                    {currentPlaying === item.id ? <PauseIcon /> : <PlayArrowIcon />}
                                                </IconButton>
                                            </Box>
                                        </TableCell>

                                        <TableCell
                                            sx={{
                                                color: "#fff",
                                                borderBottom: "none",
                                                p: isMobile ? 1.5 : 2
                                            }}
                                        >
                                            <Box sx={{ display: "flex", flexDirection: "column" }}>
                                                <Typography sx={{ fontWeight: 500, fontSize: "1rem" }}>
                                                    {item.title}
                                                </Typography>
                                                {isMobile && (
                                                    <Typography
                                                        variant="caption"
                                                        sx={{
                                                            color: "rgba(255,255,255,0.6)",
                                                            fontSize: "0.75rem",
                                                            mt: 0.5
                                                        }}
                                                    >
                                                        {formatDate(item.date_created)}
                                                    </Typography>
                                                )}
                                            </Box>
                                        </TableCell>

                                        {isMobile ? (
                                            <TableCell
                                                sx={{
                                                    borderBottom: "none",
                                                    width: "60px",
                                                    p: 1.5
                                                }}
                                            >
                                                <IconButton
                                                    size="small"
                                                    sx={{
                                                        color: "rgba(255,255,255,0.7)",
                                                        '&:hover': {
                                                            color: "#fff",
                                                        },
                                                    }}
                                                    onClick={(e) => handleMenuOpen(e, item.id)}
                                                >
                                                    <MoreVertIcon />
                                                </IconButton>
                                            </TableCell>
                                        ) : (
                                            <>
                                                <TableCell
                                                    sx={{
                                                        color: "rgba(255,255,255,0.7)",
                                                        borderBottom: "none",
                                                        p: 2
                                                    }}
                                                >
                                                    {formatDate(item.date_created)}
                                                </TableCell>
                                                <TableCell
                                                    sx={{
                                                        borderBottom: "none",
                                                        p: 2
                                                    }}
                                                >
                                                    <Chip
                                                        label={item.media_type}
                                                        size="small"
                                                        sx={{
                                                            backgroundColor: "rgba(255,255,255,0.1)",
                                                            color: "rgba(255,255,255,0.9)",
                                                            fontWeight: 500,
                                                            fontSize: "0.75rem",
                                                            height: 24
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell
                                                    sx={{
                                                        borderBottom: "none",
                                                        p: 2
                                                    }}
                                                >
                                                    <Chip
                                                        icon={item.state__name === "Active" ?
                                                            <VisibilityIcon fontSize="small" /> :
                                                            <VisibilityOffIcon fontSize="small" />
                                                        }
                                                        label={item.state__name === "Active" ? "Visible" : "Hidden"}
                                                        sx={{
                                                            backgroundColor: item.state__name === "Active"
                                                                ? "rgba(0, 136, 0, 0.15)"
                                                                : "rgba(229, 9, 20, 0.15)",
                                                            color: item.state__name === "Active" ? "#1DB954" : "#E50914",
                                                            fontWeight: 500,
                                                            fontSize: "0.75rem",
                                                            "& .MuiChip-icon": {
                                                                color: "inherit",
                                                                marginLeft: "6px",
                                                            },
                                                            height: 28
                                                        }}
                                                        size="small"
                                                    />
                                                </TableCell>
                                                <TableCell
                                                    sx={{
                                                        borderBottom: "none",
                                                        width: "60px",
                                                        p: 2
                                                    }}
                                                >
                                                    <IconButton
                                                        size="small"
                                                        sx={{
                                                            color: "rgba(255,255,255,0.7)",
                                                            '&:hover': {
                                                                color: "#fff",
                                                            },
                                                        }}
                                                        onClick={(e) => handleMenuOpen(e, item.id)}
                                                    >
                                                        <MoreVertIcon />
                                                    </IconButton>
                                                </TableCell>
                                            </>
                                        )}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}

                {/* Menu for options */}
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    PaperProps={{
                        sx: {
                            backgroundColor: "#222",
                            color: "#fff",
                            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
                            border: "1px solid rgba(255, 255, 255, 0.05)",
                            borderRadius: 2,
                            minWidth: 180,
                            mt: 1
                        }
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <MenuItem onClick={handleMenuClose} sx={{ py: 1.5 }}>
                        <ListItemIcon sx={{ color: "rgba(255,255,255,0.7)" }}>
                            <EditIcon fontSize="small" />
                        </ListItemIcon>
                        <Typography variant="body2">Edit</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleMenuClose} sx={{ py: 1.5 }}>
                        <ListItemIcon sx={{ color: "rgba(255,255,255,0.7)" }}>
                            <GetAppIcon fontSize="small" />
                        </ListItemIcon>
                        <Typography variant="body2">Download</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleMenuClose} sx={{ py: 1.5 }}>
                        <ListItemIcon sx={{ color: "rgba(255,255,255,0.7)" }}>
                            {selectedMusicId && music.find(m => m.id === selectedMusicId)?.state__name === "Active" ? (
                                <VisibilityOffIcon fontSize="small" />
                            ) : (
                                <VisibilityIcon fontSize="small" />
                            )}
                        </ListItemIcon>
                        <Typography variant="body2">
                            {selectedMusicId && music.find(m => m.id === selectedMusicId)?.state__name === "Active"
                                ? "Hide"
                                : "Show"}
                        </Typography>
                    </MenuItem>
                    <MenuItem onClick={handleMenuClose} sx={{ py: 1.5, color: "#E50914" }}>
                        <ListItemIcon sx={{ color: "#E50914" }}>
                            <DeleteIcon fontSize="small" />
                        </ListItemIcon>
                        <Typography variant="body2">Delete</Typography>
                    </MenuItem>
                </Menu>

                <UploadMusicModal open={isUploadModalOpen} handleClose={handleCloseUploadModal} />
                <MusicModal
                    open={open}
                    onClose={() => {
                        setOpen(false);
                        setCurrentPlaying(null);
                    }}
                    audioUrl={currentAudioUrl}
                    title={currentTitle}
                />
            </Box>
        </>
    );
};

export default MusicTable;