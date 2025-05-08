import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Box, Card, Chip, CardContent, Avatar, Typography, styled } from '@mui/material';
const netflixRed = "#E50914";
const netflixGreen = "#008100";

// Enhanced card component with improved design
const CreatorCard = styled(Card)(({ theme }) => ({
    width: 220,
    borderRadius: 20,
    transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    "&:hover": {
        transform: "translateY(-10px) scale(1.02)",
        boxShadow: "0 15px 30px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(229, 9, 20, 0.1)",
        "& .creator-name": {
            color: netflixRed,
        }
    },
    color: "#fff",
    padding: theme.spacing(3, 2),
    background: "linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%)",
    border: "1px solid rgba(255, 255, 255, 0.05)",
    minWidth: 160, // Prevents cards from becoming too small on mobile
    textAlign: "center", // Center content instead of using flex alignment
    position: "relative",
    margin: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
        width: 180,
        padding: theme.spacing(2),
    },
}));

// Enhanced avatar container with improved styling
const AvatarContainer = styled('div')({
    textAlign: "center",
    marginBottom: "20px",
    position: "relative",
    "&::after": {
        content: '""',
        position: "absolute",
        bottom: "-10px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "40px",
        height: "2px",
        background: `linear-gradient(90deg, transparent, ${netflixRed}, transparent)`,
        borderRadius: "2px",
    }
});

// Lower section background color
const CardContentStyled = styled(CardContent)(() => ({
    backgroundColor: '#210103', // Light blue-gray background for the lower section
    padding: '8px',
    color: "#A4A4A4",
    textAlign: 'center',
    borderTop: '1px solid #210103', // Subtle border separating image and content
    width: '100%',
}));

// Enhanced full-width container for the carousel
const FullWidthContainer = styled(Box)(({ theme }) => ({
    width: '100vw',
    position: 'relative',
    left: '50%',
    right: '50%',
    marginLeft: '-50vw',
    marginRight: '-50vw',
    backgroundColor: '#0f0f0f',
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    boxShadow: 'inset 0 10px 20px rgba(0,0,0,0.2), inset 0 -10px 20px rgba(0,0,0,0.2)',
    overflow: 'hidden',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)'
    },
    '&::after': {
        content: '""',
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)'
    }
}));

// Enhanced content wrapper for title and carousel
const ContentWrapper = styled(Box)(({ theme }) => ({
    maxWidth: '100%',
    margin: '0 auto',
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(2),
    position: 'relative',
    '& .react-multi-carousel-list': {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(3),
    },
    '& .react-multi-carousel-item': {
        padding: theme.spacing(1, 1.5),
    },
    '& .react-multiple-carousel__arrow': {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        borderRadius: '50%',
        minWidth: 40,
        minHeight: 40,
        '&:hover': {
            backgroundColor: netflixRed,
        },
        '&::before': {
            color: 'white',
            fontWeight: 'bold',
        }
    },
    '& .react-multiple-carousel__arrow--left': {
        left: theme.spacing(1),
    },
    '& .react-multiple-carousel__arrow--right': {
        right: theme.spacing(1),
    },
    '& .react-multi-carousel-dot-list': {
        bottom: '0px',
    },
    '& .react-multi-carousel-dot button': {
        borderColor: netflixRed,
        '&:hover': {
            backgroundColor: 'rgba(229, 9, 20, 0.5)',
        }
    },
    '& .react-multi-carousel-dot--active button': {
        backgroundColor: netflixRed,
    }
}));

// Responsive breakpoints configuration
// Updated responsive breakpoints with better spacing
const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 1536 },
        items: 5,
        slidesToSlide: 2,
        partialVisibilityGutter: 40
    },
    desktop: {
        breakpoint: { max: 1536, min: 1024 },
        items: 4,
        slidesToSlide: 2,
        partialVisibilityGutter: 30
    },
    tablet: {
        breakpoint: { max: 1024, min: 600 },
        items: 3,
        slidesToSlide: 1,
        partialVisibilityGutter: 20
    },
    mobile: {
        breakpoint: { max: 600, min: 0 },
        items: 1.5,
        slidesToSlide: 1,
        partialVisibilityGutter: 10
    }
};

// Sample data for carousel items
const mockCreators = [
    {
        id: 1,
        name: "Sarah Johnson",
        followers: "1.2M",
        avatar: "/api/placeholder/80/80",
    },
    {
        id: 2,
        name: "Mike Chen",
        followers: "856K",
        avatar: "/api/placeholder/80/80",
    },
    {
        id: 3,
        name: "Ella Martinez",
        followers: "2.7M",
        avatar: "/api/placeholder/80/80",
    },
    {
        id: 4,
        name: "Jacob Williams",
        followers: "980K",
        avatar: "/api/placeholder/80/80",
    },
    {
        id: 5,
        name: "Aisha Khan",
        followers: "1.5M",
        avatar: "/api/placeholder/80/80",
    },
    {
        id: 6,
        name: "David Lee",
        followers: "720K",
        avatar: "/api/placeholder/80/80",
    },
    {
        id: 7,
        name: "Sarah Johnson",
        followers: "1.2M",
        avatar: "/api/placeholder/80/80",
    },
    {
        id: 8,
        name: "Mike Chen",
        followers: "856K",
        avatar: "/api/placeholder/80/80",
    },
    {
        id: 9,
        name: "Ella Martinez",
        followers: "2.7M",
        avatar: "/api/placeholder/80/80",
    },
    {
        id: 10,
        name: "Jacob Williams",
        followers: "980K",
        avatar: "/api/placeholder/80/80",
    },
    {
        id: 11,
        name: "Aisha Khan",
        followers: "1.5M",
        avatar: "/api/placeholder/80/80",
    },
    {
        id: 12,
        name: "David Lee",
        followers: "720K",
        avatar: "/api/placeholder/80/80",
    },
];

const ArtistCarousel = () => {
    return (
        <FullWidthContainer>
            <ContentWrapper>
                <Typography
                    variant="h5"
                    sx={{
                        color: 'white',
                        fontWeight: 700,
                        mb: 3,
                        ml: 1,
                        position: 'relative',
                        display: 'inline-block',
                        '&::after': {
                            content: '""',
                            position: 'absolute',
                            bottom: '-8px',
                            left: '0',
                            width: '40%',
                            height: '3px',
                            backgroundColor: netflixRed,
                            borderRadius: '2px'
                        }
                    }}
                >
                    Top Artists to Follow
                </Typography>

                {/* Carousel is kept as it is since it's from a library */}
                <Carousel
                    responsive={responsive}
                    infinite={true}
                    autoPlay={false}
                    autoPlaySpeed={3000}
                    keyBoardControl={true}
                    customTransition="transform 600ms cubic-bezier(0.23, 1, 0.32, 1)"
                    transitionDuration={600}
                    containerClass="carousel-container"
                    removeArrowOnDeviceType={["mobile"]}
                    dotListClass="custom-dot-list-style"
                    itemClass="carousel-item"
                    centerMode={false}
                    partialVisible={true}
                    arrows={true}
                    renderButtonGroupOutside={true}
                    swipeable={true}
                    draggable={true}
                    ssr={true}
                    slidesToSlide={1}
                    deviceType="desktop"
                >
                    {mockCreators.map((creator) => (
                        <CreatorCard key={creator.id}>
                            <AvatarContainer>
                                <Avatar
                                    src={creator.avatar}
                                    alt={creator.name}
                                    sx={{
                                        width: { xs: 80, sm: 100 },
                                        height: { xs: 80, sm: 100 },
                                        border: `4px solid ${netflixRed}`,
                                        margin: "0 auto", // Center the avatar
                                        boxShadow: '0 5px 15px rgba(229, 9, 20, 0.3)',
                                        transition: 'transform 0.3s ease',
                                        '&:hover': {
                                            transform: 'scale(1.05)'
                                        }
                                    }}
                                />
                            </AvatarContainer>

                            <Typography
                                variant="subtitle1"
                                fontWeight={700}
                                className="creator-name"
                                sx={{
                                    textAlign: 'center',
                                    fontSize: { xs: '1rem', sm: '1.1rem' },
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    width: '100%',
                                    whiteSpace: 'nowrap',
                                    marginBottom: 1.5,
                                    letterSpacing: '0.5px',
                                    transition: 'color 0.3s ease'
                                }}
                            >
                                {creator.name}
                            </Typography>

                            <div style={{ textAlign: 'center' }}>
                                <Chip
                                    label={`${creator.followers} followers`}
                                    size="small"
                                    sx={{
                                        bgcolor: 'rgba(229, 9, 20, 0.15)',
                                        color: 'white',
                                        borderRadius: '12px',
                                        padding: '4px 2px',
                                        border: '1px solid rgba(229, 9, 20, 0.3)',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            bgcolor: 'rgba(229, 9, 20, 0.3)',
                                            transform: 'translateY(-2px)'
                                        },
                                        '& .MuiChip-label': {
                                            fontWeight: 600,
                                            fontSize: { xs: '0.7rem', sm: '0.8rem' },
                                            padding: '2px 4px',
                                            letterSpacing: '0.3px'
                                        },
                                        display: 'inline-block', // Uses inline-block instead of flex
                                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
                                    }}
                                />
                            </div>
                        </CreatorCard>
                    ))}
                </Carousel>
            </ContentWrapper>
        </FullWidthContainer>
    );
};

export default ArtistCarousel;