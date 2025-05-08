import React, { useState, useEffect, useRef } from "react";
import { Modal, Box, IconButton, Typography, Backdrop, Fade, Grid } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';

const style = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 450, // Slightly wider to accommodate the new layout
    height: 350,
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
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [volume, setVolume] = useState(0.7);
    const [isMuted, setIsMuted] = useState(false);

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const animationRef = useRef<number | null>(null);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const setAudioData = () => {
            setDuration(audio.duration);
            setCurrentTime(audio.currentTime);
        };

        // We'll rely on requestAnimationFrame for smoother updates
        // rather than the timeupdate event
        audio.addEventListener('loadeddata', setAudioData);

        // Auto-play when modal opens if audio is loaded
        if (open) {
            audio.play().then(() => {
                setIsPlaying(true);
                animationRef.current = requestAnimationFrame(whilePlaying);
            }).catch(error => {
                console.error("Playback failed:", error);
            });
        }

        // Cleanup
        return () => {
            audio.removeEventListener('loadeddata', setAudioData);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [open]);

    useEffect(() => {
        // Update volume and mute status
        if (audioRef.current) {
            audioRef.current.volume = isMuted ? 0 : volume;
        }
    }, [volume, isMuted]);

    const togglePlayPause = () => {
        const audio = audioRef.current;
        if (!audio) return;

        const prevValue = isPlaying;
        setIsPlaying(!prevValue);

        if (!prevValue) {
            audio.play();
            // Ensure we start the animation frame loop
            if (!animationRef.current) {
                animationRef.current = requestAnimationFrame(whilePlaying);
            }
        } else {
            audio.pause();
            // Cancel the animation frame when paused
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
                animationRef.current = null;
            }
        }
    };

    const whilePlaying = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
            animationRef.current = requestAnimationFrame(whilePlaying);
        }
    };

    const formatTime = (time: number) => {
        if (isNaN(time)) return "0:00";

        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    };

    const changeRange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (audioRef.current) {
            audioRef.current.currentTime = Number(e.target.value);
            setCurrentTime(Number(e.target.value));
        }
    };

    const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVolume(Number(e.target.value));
    };

    const toggleMute = () => {
        setIsMuted(!isMuted);
    };

    // Visual equalizer bars for animation when playing
    const EqualizerBars = () => {
        return (
            <Box display="flex" alignItems="center" justifyContent="center" sx={{ gap: 0.5, height: 16 }}>
                {[...Array(5)].map((_, i) => (
                    <Box
                        key={i}
                        sx={{
                            width: 4,
                            height: isPlaying ? `${Math.random() * 16 + 4}px` : '4px',
                            borderRadius: 2,
                            bgcolor: i % 2 === 0 ? '#E50914' : '#008100',
                            animation: isPlaying ? 'pulse 0.5s infinite' : 'none',
                            animationDuration: `${0.5 + Math.random() * 0.5}s`,
                            animationDelay: `${i * 0.1}s`,
                            '@keyframes pulse': {
                                '0%': {
                                    height: '4px',
                                },
                                '50%': {
                                    height: `${Math.random() * 16 + 4}px`,
                                },
                                '100%': {
                                    height: '4px',
                                },
                            },
                        }}
                    />
                ))}
            </Box>
        );
    };

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
                            p: 3,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            color: "#fff",
                            position: "relative",
                            overflow: "hidden",
                            bgcolor: '#1a1a1a',
                        }}
                    >
                        {/* Dynamic background elements */}
                        <Box sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            zIndex: 0,
                            overflow: 'hidden',
                        }}>
                            {/* Music visualization bars */}
                            <Box sx={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                height: 60,
                                display: 'flex',
                                alignItems: 'flex-end',
                                justifyContent: 'space-evenly',
                                opacity: 0.3,
                            }}>
                                {[...Array(16)].map((_, i) => (
                                    <Box
                                        key={i}
                                        sx={{
                                            width: 8,
                                            height: isPlaying ? `${Math.sin((i / 3)) * 50 + 20}%` : '5%',
                                            background: 'linear-gradient(to top, #E50914, #008100)',
                                            borderTopLeftRadius: 4,
                                            borderTopRightRadius: 4,
                                            transition: 'height 0.2s ease',
                                            animation: isPlaying ? 'equalizer 0.8s infinite' : 'none',
                                            animationDuration: `${0.8 + (i % 4) * 0.2}s`,
                                            animationDelay: `${i * 0.05}s`,
                                            '@keyframes equalizer': {
                                                '0%': { height: '5%' },
                                                '50%': { height: `${Math.sin((i / 3) + 0.5) * 50 + 20}%` },
                                                '100%': { height: '5%' },
                                            },
                                        }}
                                    />
                                ))}
                            </Box>

                            {/* Gradient overlay */}
                            <Box sx={{
                                position: 'absolute',
                                inset: 0,
                                background: `linear-gradient(to bottom right, rgba(229, 9, 20, 0.2) 0%, rgba(0, 129, 0, 0.2) 20%, rgba(26, 26, 26, 0.1) 80%)`,
                                animation: isPlaying ? 'pulse 3s infinite' : 'none',
                                '@keyframes pulse': {
                                    '0%': { opacity: 0.1 },
                                    '50%': { opacity: 0.2 },
                                    '100%': { opacity: 0.1 },
                                },
                            }} />
                        </Box>

                        {/* Grid Layout */}
                        <Grid container spacing={2} sx={{ zIndex: 1, height: "100%" }}>
                            {/* Volume Slider Column - 1/12 */}
                            <Grid item xs={1} sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '100%',
                                pl: 0,
                                pr: 1
                            }}>
                                <IconButton
                                    onClick={toggleMute}
                                    sx={{
                                        color: 'white',
                                        p: 0.5,
                                        mb: 1
                                    }}
                                >
                                    {isMuted ? <VolumeOffIcon fontSize="small" /> : <VolumeUpIcon fontSize="small" />}
                                </IconButton>

                                <Box sx={{
                                    position: 'relative',
                                    width: 4,
                                    height: '60%',
                                    bgcolor: 'rgba(0, 0, 0, 0.3)',
                                    backdropFilter: 'blur(4px)',
                                    borderRadius: 2,
                                    overflow: 'hidden',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <input
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="0.01"
                                        value={volume}
                                        onChange={changeVolume}
                                        style={{
                                            position: 'absolute',
                                            width: '150%',
                                            height: '100%',
                                            opacity: 0,
                                            cursor: 'pointer',
                                            transform: 'rotate(270deg)',
                                            transformOrigin: 'center',
                                        }}
                                    />
                                    <Box
                                        sx={{
                                            width: '100%',
                                            background: 'linear-gradient(to top, rgba(229, 9, 20, 0.7), rgba(0, 129, 0, 0.7))',
                                            height: `${volume * 100}%`,
                                            position: 'absolute',
                                            bottom: 0,
                                        }}
                                    />
                                </Box>

                                <Box sx={{
                                    mt: 1,
                                    transform: 'rotate(-90deg)',
                                    transformOrigin: 'center',
                                    display: 'flex',
                                    justifyContent: 'center'
                                }}>
                                    <EqualizerBars />
                                </Box>
                            </Grid>

                            {/* Main Content Column - 11/12 */}
                            <Grid item xs={11} sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                height: '100%',
                                pl: 1
                            }}>
                                {/* Header */}
                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                    <Box display="flex" alignItems="center" gap={1}>
                                        <Box sx={{
                                            width: 32,
                                            height: 32,
                                            borderRadius: '50%',
                                            bgcolor: 'rgba(0, 0, 0, 0.3)',
                                            backdropFilter: 'blur(4px)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            animation: isPlaying ? 'spin 3s linear infinite' : 'none',
                                            '@keyframes spin': {
                                                from: { transform: 'rotate(0deg)' },
                                                to: { transform: 'rotate(360deg)' },
                                            },
                                        }}>
                                            <Box sx={{
                                                width: 24,
                                                height: 24,
                                                borderRadius: '50%',
                                                background: 'linear-gradient(to bottom right, #E50914, #008100)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}>
                                                <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: 'white' }} />
                                            </Box>
                                        </Box>
                                        <Typography variant="h5" fontWeight="bold" sx={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                                            {title} Playing
                                        </Typography>
                                    </Box>
                                    <IconButton onClick={onClose} sx={{ color: "#fff" }}>
                                        <CloseIcon />
                                    </IconButton>
                                </Box>

                                {/* Album Art Placeholder */}
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    mt: 1,
                                    mb: 2
                                }}>
                                    <Box sx={{
                                        width: 100,
                                        height: 100,
                                        borderRadius: '50%',
                                        bgcolor: 'rgba(0, 0, 0, 0.3)',
                                        backdropFilter: 'blur(4px)',
                                        border: '1px solid rgba(255, 255, 255, 0.1)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                                        transform: isPlaying ? 'scale(1.05)' : 'scale(1)',
                                        transition: 'transform 0.5s ease',
                                    }}>
                                        <Box sx={{
                                            width: 88,
                                            height: 88,
                                            borderRadius: '50%',
                                            background: 'linear-gradient(to bottom right, rgba(229, 9, 20, 0.8), rgba(26, 26, 26, 0.9), rgba(0, 129, 0, 0.8))',
                                            padding: 0.5,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>
                                            <Box sx={{
                                                width: '100%',
                                                height: '100%',
                                                borderRadius: '50%',
                                                bgcolor: '#1a1a1a',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}>
                                                <Box sx={{
                                                    width: 24,
                                                    height: 24,
                                                    borderRadius: '50%',
                                                    background: 'linear-gradient(to bottom right, #E50914, #008100)',
                                                    animation: isPlaying ? 'spin 8s linear infinite' : 'none',
                                                }} />
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>

                                {/* Progress bar */}
                                <Box>
                                    <Box display="flex" justifyContent="space-between" sx={{ mb: 0.5 }}>
                                        <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                                            {formatTime(currentTime)}
                                        </Typography>
                                        <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                                            {formatTime(duration)}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ position: 'relative', height: 8, bgcolor: 'rgba(0, 0, 0, 0.3)', backdropFilter: 'blur(4px)', borderRadius: 1, overflow: 'hidden' }}>
                                        <input
                                            type="range"
                                            min="0"
                                            max={duration || 0}
                                            value={currentTime}
                                            onChange={changeRange}
                                            style={{
                                                position: 'absolute',
                                                width: '100%',
                                                height: '100%',
                                                opacity: 0,
                                                cursor: 'pointer',
                                                zIndex: 2,
                                            }}
                                        />
                                        <Box
                                            sx={{
                                                height: '100%',
                                                background: 'linear-gradient(to right, #E50914, #008100)',
                                                width: `${(currentTime / duration) * 100 || 0}%`,
                                            }}
                                        />
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                height: 16,
                                                width: 16,
                                                borderRadius: '50%',
                                                bgcolor: 'white',
                                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                                                top: '50%',
                                                transform: 'translateY(-50%)',
                                                left: `calc(${(currentTime / duration) * 100 || 0}% - 8px)`,
                                                pointerEvents: 'none',
                                            }}
                                        />
                                    </Box>
                                </Box>

                                {/* Controls */}
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 3, mt: 2 }}>
                                    <IconButton sx={{ color: 'white' }}>
                                        <SkipPreviousIcon />
                                    </IconButton>

                                    <IconButton
                                        onClick={togglePlayPause}
                                        sx={{
                                            p: 1.5,
                                            background: 'linear-gradient(to bottom right, #E50914, #008100)',
                                            color: 'white',
                                            transform: 'scale(1)',
                                            transition: 'transform 0.2s ease',
                                            '&:hover': {
                                                transform: 'scale(1.05)',
                                                background: 'linear-gradient(to bottom right, #f52d36, #00a000)',
                                            },
                                            boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
                                        }}
                                    >
                                        {isPlaying ? <PauseIcon fontSize="large" /> : <PlayArrowIcon fontSize="large" />}
                                    </IconButton>

                                    <IconButton sx={{ color: 'white' }}>
                                        <SkipNextIcon />
                                    </IconButton>
                                </Box>
                            </Grid>
                        </Grid>

                        {/* Hidden audio element */}
                        <audio ref={audioRef} src={audioUrl} style={{ display: 'none' }} />
                    </Box>
                </Box>
            </Fade>
        </Modal>
    );
};

export default MusicModal;