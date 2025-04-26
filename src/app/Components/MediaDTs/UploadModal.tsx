import React, { useState } from 'react';
import {
    Box, Button, Typography, CircularProgress, Modal, RadioGroup, Radio, FormControlLabel, TextField
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useUserStore } from '@/store';
import { uploadMusic } from '@/lib/apiService';
import { toast } from 'react-toastify';

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

const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: 400, sm: 400, md: 450 },
    bgcolor: '#1e1e1e',
    border: '0.5px solid #000', // thinner border
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
    color: '#fff',
};

type UploadMusicModalProps = {
    open: boolean;
    handleClose: () => void;
};

const UploadMusicModal: React.FC<UploadMusicModalProps> = ({ open, handleClose }) => {
    const [formData, setFormData] = useState({
        title: '',
        genre: '',
        media_type: '',
        release_date: '',
        language: '',
        is_explicit: 'no',
        file: null as File | null,
    });
    const [loading, setLoading] = useState(false);
    const user = useUserStore.getState().user
    const handleSubmit = async () => {
        const payload = new FormData();
        setLoading(true)
        payload.append("route", "content/api/upload/");
        payload.append("artist", user?.user_id || "");

        Object.entries(formData).forEach(([key, value]) => {
            if (value !== null) {
                payload.append(key, value);
            }
        });

        try {
            const response = await uploadMusic(payload)
            if (response.status_code === 200) {
                toast.success("Upload successful");
                setLoading(false)
                handleClose();
            } else {
                toast.error("Upload failed");
            }
        } catch (err) {
            setLoading(false)
            console.error(err);
            toast.error("An error occurred during upload");
        }
    };


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setFormData(prev => ({ ...prev, file }));
    };
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

    // const handleSubmit = () => {
    //     const payload = new FormData();
    //     Object.entries(formData).forEach(([key, value]) => {
    //         if (value !== null) payload.append(key, value);
    //     });

    //     console.log("Uploading:", payload.get("title"));
    //     handleClose();
    // };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
                <Typography variant="h6" gutterBottom>Content Upload</Typography>

                <InputField
                    label="Title"
                    name="title"
                    fullWidth
                    variant="outlined"
                    value={formData.title}
                    onChange={handleChange}
                />

                <InputField
                    label="Genre"
                    name="genre"
                    fullWidth
                    variant="outlined"
                    value={formData.genre}
                    onChange={handleChange}
                />

                <InputField
                    label="Media Type"
                    name="media_type"
                    fullWidth
                    variant="outlined"
                    value={formData.media_type}
                    onChange={handleChange}
                />

                <InputField
                    label="Release Date"
                    name="release_date"
                    type="date"
                    fullWidth
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                    value={formData.release_date}
                    onChange={handleChange}
                />

                <InputField
                    label="Language"
                    name="language"
                    fullWidth
                    variant="outlined"
                    value={formData.language}
                    onChange={handleChange}
                />

                <RadioGroup
                    row
                    name="is_explicit"
                    value={formData.is_explicit}
                    onChange={handleChange}
                >
                    <FormControlLabel value="no" control={<Radio sx={{ color: "#fff" }} />} label="Not Explicit" />
                    <FormControlLabel value="yes" control={<Radio sx={{ color: "#fff" }} />} label="Explicit" />
                </RadioGroup>

                <Button
                    component="label"
                    variant="contained"
                    fullWidth
                    sx={{
                        mt: 2,
                        mb: 2,
                        backgroundColor: "#333",
                        color: "#fff",
                        py: 2, // more vertical padding
                        textTransform: 'none',
                        fontWeight: 'bold',
                    }}
                >
                    Select File
                    <input type="file" hidden onChange={handleFileChange} />
                </Button>

                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <NextButton onClick={handleSubmit} variant="contained" disabled={loading}>
                        {loading ? (
                            <CircularProgress size="30px" sx={{ color: '#ffffff' }} />
                        ) : (
                            "Upload"
                        )}</NextButton>
                </Box>

            </Box>
        </Modal>
    );
}

export default UploadMusicModal;
