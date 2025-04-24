import React, { useRef, useState, useEffect } from "react";
import {
    AppBar, Toolbar, Box, TextField, Button, IconButton, Drawer,
    Link, useMediaQuery, useTheme, Stack, Avatar,
    CircularProgress,
    Typography
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/SearchTwoTone"; // Search icon (two-tone)
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Image from 'next/image';
import EditIcon from "@mui/icons-material/Edit";
import { useUserStore } from "@/store";
import { createArtist } from "@/lib/apiService";
import { toast } from 'react-toastify';

// const SearchBar = styled(TextField)({
//     width: "500px",  // Set the width for the search bar
//     backgroundColor: "#222",
//     borderRadius: "30px",  // Apply border radius to the whole field

//     // Apply border-radius to the input container and the fieldset
//     "& .MuiOutlinedInput-root": {
//         borderRadius: "30px",  // Rounded borders for the whole input field
//         "& fieldset": {
//             borderColor: "#555",  // Border color when not focused
//             borderRadius: "30px",  // Ensure fieldset follows the same rounding
//         },
//         "&:hover fieldset": {
//             borderColor: "#e50914",  // Border color on hover
//         },
//         "&.Mui-focused fieldset": {
//             borderColor: "#e50914",  // Border color when focused
//         },
//     },

//     // Ensure the text inside is also styled as you wish
//     "& .MuiInputBase-input": {
//         color: "#fff",
//         padding: "10px",
//     },
// });
const PostContentButton = styled(Button)(() => ({
    border: '1px solid #fff',
    borderRadius: '24px',
    backgroundColor: 'transparent',
    color: '#fff',
    fontWeight: 'bold',
    padding: '8px 16px',
    textTransform: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '2px', // space between icon and text
    '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
}))
const InputField = styled(TextField)({
    marginBottom: "20px",
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
        padding: "16px",
    },
    "& label": {
        color: "#aaa",
    },
    "& .MuiInputLabel-root.Mui-focused, & .MuiInputLabel-shrink": {
        color: "#ffffff",
    },
});
const InputArea = styled(TextField)({
    marginBottom: "20px",
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
        "& textarea": {
            color: "#fff",
            padding: "13px",
            fontFamily: "inherit",
        },
        "& input": {
            color: "#fff",
            padding: "13px",
        },
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
    backgroundColor: "#fff",
    color: "#000",
    fontSize: "1rem",
    textTransform: "none",
    marginBottom: "0px",
    "&:hover": {
        backgroundColor: "#C62828",
    },
});
type Artist = {
    name: string;
    stage_name: string;
    bio: string;
    profile_picture: string;
    origin_country: string;
    user_id: string;
    debut_year: string;
};

type Props = {
    artist: Artist;
};

export default function Topbar({ artist }: Props) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const user = useUserStore.getState().user

    const toggleDrawer = (open: boolean) => {
        setDrawerOpen(open);
        setProfileData(artist)
        setPreview(artist?.profile_picture)
    };
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [profileData, setProfileData] = useState({
        stage_name: "",
        bio: "",
        origin_country: "",
        debut_year: "",
    });

    const handleChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setProfileData({ ...profileData, [field]: event.target.value });
    };
    const handleImageClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            const imageUrl = URL.createObjectURL(file);
            setPreview(imageUrl);
            setFile(file);
            console.log("Selected file:", file);
        }
    };

    const UpdateArtist = async () => {
        setLoading(true)
        const formData = new FormData();
        formData.append("route", "content/api/create_artist/");
        formData.append("name", user?.full_name || "");
        formData.append("stage_name", profileData.stage_name || "");
        formData.append("bio", profileData.bio || "");
        formData.append("origin_country", profileData.origin_country || "");
        formData.append("user_id", user?.user_id?.toString() || "");
        formData.append("debut_year", profileData.debut_year?.toString() || "");
        if (file) {
            formData.append("file", file);
        }
        try {
            const response = await createArtist(formData)
            if (response.status_code === 200) {
                toast.success('Profile updated successfully');

            } else {
                toast.error('Error updating profile');
            }
        } catch (error) {
            console.error(error)

        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        setProfileData(artist)
        setPreview(artist?.profile_picture)
    }, [])

    return (
        <AppBar position="sticky" sx={{ backgroundColor: "#000", padding: "10px 0" }}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: '1.5px solid #1A1A1A' }}>
                {/* Logo for mobile view */}
                {isMobile && (
                    <Box sx={{ display: "flex", alignItems: "center", marginLeft: "10px", marginRight: "10px" }}>
                        <Image
                            src="/images/Logo.png"
                            alt="Logo"
                            width={70}
                            height={33}
                        />
                    </Box>
                )}

                {/* Search Bar for larger screens */}
                {!isMobile && (
                    // <SearchBar
                    //     variant="outlined"
                    //     placeholder="Search..."
                    //     size="small"
                    //     InputProps={{
                    //         startAdornment: (
                    //             <InputAdornment position="start">
                    //                 <SearchIcon sx={{ color: "#fff" }} />  {/* Set icon color to white */}
                    //             </InputAdornment>
                    //         ),
                    //     }}
                    // />
                    <Typography variant="h6" fontWeight="bold" >Play-KE Studio</Typography>
                )}

                {/* Mobile View: Search Icon, Post Content Button, and Menu Icon */}
                {isMobile && (
                    <Box display="flex" alignItems="center" gap={1}>
                        {/* Search Icon */}
                        <IconButton sx={{ color: "#fff" }}>
                            <SearchIcon />  {/* Two-tone Search Icon */}
                        </IconButton>

                        {/* Post Content Button */}
                        <Link href="/home">
                            <IconButton
                                sx={{
                                    borderColor: "#e50914",
                                    color: "#e50914",
                                    "&:hover": {
                                        borderColor: "#C62828",
                                        color: "#C62828",
                                    },
                                }}
                            >
                                <HomeOutlinedIcon />
                            </IconButton></Link>
                        <IconButton
                            sx={{
                                backgroundColor: '#e50914',
                                color: '#fff',
                                borderRadius: '12px', // for a more rounded material look
                                '&:hover': {
                                    backgroundColor: '#c40811', // slight hover shade
                                },
                                padding: '8px', // optional: more space around the icon
                            }}
                            onClick={() => toggleDrawer(true)}
                        >
                            <AccountCircleOutlinedIcon />
                        </IconButton>


                    </Box>
                )}

                {/* Desktop view: Right-aligned buttons (Donate, Post Content, Topup) */}
                {!isMobile && (
                    <Box display="flex" gap={2} alignItems="center">
                        <Link href="/home">
                            <PostContentButton startIcon={<HomeOutlinedIcon />}>
                                Home
                            </PostContentButton></Link>


                        {/* Post Content Button */}
                        <IconButton
                            sx={{
                                backgroundColor: '#e50914',
                                color: '#fff',
                                borderRadius: '12px', // for a more rounded material look
                                '&:hover': {
                                    backgroundColor: '#c40811', // slight hover shade
                                },
                                padding: '8px', // optional: more space around the icon
                            }}
                            onClick={() => toggleDrawer(true)}
                        >
                            <AccountCircleOutlinedIcon />
                        </IconButton>
                    </Box>
                )}
            </Toolbar>

            {/* Drawer for mobile menu */}
            <Drawer anchor="right" open={drawerOpen} onClose={() => toggleDrawer(false)}>
                <Box
                    sx={{
                        width: 500,
                        minHeight: "100vh",
                        background: "linear-gradient(180deg, #1A1A1A, #0D0D0D)",
                        color: "#fff",
                        p: 6,
                    }}
                >
                    <Stack spacing={3}>
                        {/* Profile Picture Section */}
                        <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
                            <Box sx={{ position: "relative", width: 100, height: 100 }}>
                                <Avatar
                                    sx={{ width: 100, height: 100 }}
                                    src={preview || ""}
                                />
                                <IconButton
                                    sx={{
                                        position: "absolute",
                                        bottom: 0,
                                        right: 0,
                                        backgroundColor: "#e50914",
                                        color: "#fff",
                                        "&:hover": {
                                            backgroundColor: "#c40812",
                                        },
                                    }}
                                    onClick={handleImageClick}
                                >
                                    <EditIcon />
                                </IconButton>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    hidden
                                    onChange={handleFileChange}
                                />
                            </Box>
                        </Box>

                        {/* Input Fields Section */}
                        <Box mt={3}>
                            <InputField
                                fullWidth
                                label="Stage Name"
                                value={profileData?.stage_name}
                                onChange={handleChange("stage_name")}
                            />

                            <InputArea
                                fullWidth
                                label="Bio"
                                multiline
                                minRows={3}
                                value={profileData?.bio}
                                onChange={handleChange("bio")}
                            />


                            <InputField
                                fullWidth
                                label="Origin Country"
                                value={profileData?.origin_country}
                                onChange={handleChange("origin_country")}
                            />

                            <InputField
                                fullWidth
                                label="Debut Year"
                                value={profileData?.debut_year}
                                onChange={handleChange("debut_year")}
                                type="number"
                            />
                            <NextButton onClick={UpdateArtist} variant="contained" disabled={loading}>
                                {loading ? (
                                    <CircularProgress size="30px" sx={{ color: '#ffffff' }} />
                                ) : (
                                    "Update Profile"
                                )}</NextButton>
                        </Box>
                    </Stack>
                </Box>
            </Drawer>
        </AppBar>
    );
}
