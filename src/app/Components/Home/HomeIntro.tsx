import {
    Grid,
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    Avatar,
    Stack,
    Divider,
    LinearProgress
} from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWalletTwoTone";
import AddCircleOutlineTwoToneIcon from '@mui/icons-material/AddCircleOutlineTwoTone';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import MusicNoteIcon from '@mui/icons-material/MusicNote';

export default function DashboardIntro() {
    return (
        <Box sx={{ backgroundColor: "#0f0f0f", px: 3, py: 4 }}>
            <Grid container spacing={4} alignItems="stretch">
                {/* Left Gradient Card */}
                <Grid item xs={12} md={8} sx={{ display: "flex" }}>
                    <Card
                        elevation={4}
                        sx={{
                            borderRadius: 4,
                            background: "linear-gradient(135deg, #e50914 10%, #2D1B20 100%)",
                            color: "#fff",
                            p: 0,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            width: "100%",
                            overflow: "hidden",
                            position: "relative"
                        }}
                    >
                        {/* Abstract background shapes */}
                        <Box sx={{
                            position: "absolute",
                            top: 0,
                            right: 0,
                            width: "50%",
                            height: "100%",
                            opacity: 0.07,
                            background: "radial-gradient(circle at 70% 20%, rgba(255,255,255,0.8) 0%, transparent 70%)"
                        }} />

                        <CardContent sx={{ p: 4, position: "relative", zIndex: 2 }}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 3 }}>
                                <Box>
                                    <Typography
                                        variant="h4"
                                        fontWeight="700"
                                        gutterBottom
                                        sx={{
                                            letterSpacing: "-0.02em",
                                            mb: 1,
                                            textShadow: "0 2px 4px rgba(0,0,0,0.2)"
                                        }}
                                    >
                                        Premium Streaming
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        fontWeight="500"
                                        sx={{
                                            opacity: 0.9,
                                            mb: 3,
                                            letterSpacing: "-0.01em"
                                        }}
                                    >
                                        Top up your account to unlock all features
                                    </Typography>
                                </Box>

                                <Avatar
                                    sx={{
                                        bgcolor: "rgba(255,255,255,0.15)",
                                        width: 56,
                                        height: 56,
                                        boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
                                    }}
                                >
                                    <AccountBalanceWalletIcon sx={{ fontSize: 32 }} />
                                </Avatar>
                            </Box>

                            <Stack
                                direction="row"
                                spacing={2}
                                sx={{
                                    mb: 4,
                                    pb: 3,
                                    borderBottom: "1px solid rgba(255,255,255,0.15)"
                                }}
                            >
                                <Box sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    p: 1.5,
                                    bgcolor: "rgba(255,255,255,0.1)",
                                    borderRadius: 2
                                }}>
                                    <LocalMoviesIcon sx={{ mr: 1 }} />
                                    <Typography variant="body2" fontWeight="500">Movies</Typography>
                                </Box>
                                <Box sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    p: 1.5,
                                    bgcolor: "rgba(255,255,255,0.1)",
                                    borderRadius: 2
                                }}>
                                    <MusicNoteIcon sx={{ mr: 1 }} />
                                    <Typography variant="body2" fontWeight="500">Music</Typography>
                                </Box>
                                <Box sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    p: 1.5,
                                    bgcolor: "rgba(255,255,255,0.1)",
                                    borderRadius: 2
                                }}>
                                    <HeadphonesIcon sx={{ mr: 1 }} />
                                    <Typography variant="body2" fontWeight="500">Podcasts</Typography>
                                </Box>
                            </Stack>

                            <Typography
                                variant="body1"
                                sx={{
                                    mb: 4,
                                    lineHeight: 1.7,
                                    opacity: 0.9,
                                    maxWidth: "90%"
                                }}
                            >
                                Enjoy uninterrupted access to our exclusive content library.
                                Upgrade today and experience premium streaming quality with
                                no ads and unlimited downloads.
                            </Typography>

                            <Button
                                variant="contained"
                                startIcon={<AccountBalanceWalletIcon />}
                                sx={{
                                    textTransform: "none",
                                    bgcolor: "rgba(255,255,255,0.15)",
                                    color: "#fff",
                                    borderRadius: 3,
                                    fontWeight: 600,
                                    fontSize: "1rem",
                                    px: 3,
                                    py: 1.2,
                                    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                                    '&:hover': {
                                        bgcolor: "rgba(255,255,255,0.25)",
                                    }
                                }}
                            >
                                Top Up Now
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Right Earnings Card */}
                <Grid item xs={12} md={4} sx={{ display: "flex" }}>
                    <Card
                        elevation={4}
                        sx={{
                            borderRadius: 4,
                            backgroundColor: "#1c1c1c",
                            color: "#fff",
                            p: 0,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            width: "100%",
                            overflow: "hidden"
                        }}
                    >
                        <CardContent sx={{ p: 4 }}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 3 }}>
                                <Box>
                                    <Typography
                                        variant="subtitle1"
                                        sx={{
                                            color: "#ccc",
                                            textTransform: "uppercase",
                                            fontSize: "0.75rem",
                                            letterSpacing: "0.08em",
                                            fontWeight: 500,
                                            mb: 0.5
                                        }}
                                    >
                                        Amount Earned
                                    </Typography>
                                    <Stack direction="row" alignItems="flex-end" spacing={1}>
                                        <Typography
                                            variant="h3"
                                            fontWeight="700"
                                            sx={{
                                                letterSpacing: "-0.02em",
                                                color: "#ffffff",
                                                display: "flex",
                                                alignItems: "center"
                                            }}
                                        >
                                            KSh 12,750
                                        </Typography>
                                        <Box sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            color: "#4caf50",
                                            mb: 1
                                        }}>
                                            <ArrowUpwardIcon sx={{ fontSize: 16 }} />
                                            <Typography variant="body2" fontWeight="600">12%</Typography>
                                        </Box>
                                    </Stack>
                                </Box>

                                <Avatar
                                    sx={{
                                        bgcolor: "#e50914",
                                        width: 48,
                                        height: 48,
                                        boxShadow: "0 4px 8px rgba(229,9,20,0.3)"
                                    }}
                                >
                                    <TrendingUpIcon />
                                </Avatar>
                            </Box>

                            <Box sx={{ mb: 3 }}>
                                <Typography variant="body2" fontWeight="500" sx={{ mb: 1, display: "flex", justifyContent: "space-between" }}>
                                    <span>Monthly Target</span>
                                    <span>65%</span>
                                </Typography>
                                <LinearProgress
                                    variant="determinate"
                                    value={65}
                                    sx={{
                                        height: 8,
                                        borderRadius: 4,
                                        bgcolor: "rgba(255,255,255,0.1)",
                                        '& .MuiLinearProgress-bar': {
                                            bgcolor: "#e50914"
                                        }
                                    }}
                                />
                            </Box>

                            <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", my: 3 }} />

                            <Typography
                                variant="body2"
                                sx={{
                                    mb: 3,
                                    lineHeight: 1.6,
                                    opacity: 0.9
                                }}
                            >
                                Earn more by posting your original content. Higher quality content attracts more subscribers and increases your earnings.
                            </Typography>

                            <Button
                                variant="contained"
                                startIcon={<AddCircleOutlineTwoToneIcon />}
                                sx={{
                                    textTransform: "none",
                                    bgcolor: "#e50914",
                                    color: "#fff",
                                    borderRadius: 3,
                                    fontWeight: 600,
                                    fontSize: "0.95rem",
                                    px: 3,
                                    py: 1.2,
                                    boxShadow: "0 4px 10px rgba(229,9,20,0.3)",
                                    '&:hover': {
                                        bgcolor: "#c50812",
                                    }
                                }}
                            >
                                Post Content
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}