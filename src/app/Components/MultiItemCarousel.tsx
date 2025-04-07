import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Box, Card, CardContent, Typography, styled } from '@mui/material';

// Styled card component
const ItemCard = styled(Card)(({ theme }) => ({
    margin: '0 8px',
    height: '200px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#210103',  // Overall card background color
    borderRadius: '8px',
    transition: 'transform 0.3s ease',
    '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: theme.shadows[4],
    },
    overflow: 'hidden',
}));

// Lower section background color
const CardContentStyled = styled(CardContent)(() => ({
    backgroundColor: '#210103', // Light blue-gray background for the lower section
    padding: '8px',
    color: "#A4A4A4",
    textAlign: 'center',
    borderTop: '1px solid #210103', // Subtle border separating image and content
    width: '100%',
}));

// Responsive breakpoints configuration
const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 1536 },
        items: 5,
        slidesToSlide: 3
    },
    desktop: {
        breakpoint: { max: 1536, min: 1024 },
        items: 5,
        slidesToSlide: 2
    },
    tablet: {
        breakpoint: { max: 1024, min: 600 },
        items: 3,
        slidesToSlide: 2
    },
    mobile: {
        breakpoint: { max: 600, min: 0 },
        items: 1,
        slidesToSlide: 1
    }
};

// Sample data for carousel items
const carouselItems = [
    { id: 1, content: 'Matata Animation', image: "/images/song1.png" },
    { id: 2, content: 'DJ NNHT MIX', image: "/images/song2.png" },
    { id: 3, content: 'Hustler Challenge', image: "/images/song3.png" },
    { id: 4, content: 'Groovy JO 25Flow', image: "/images/song4.png" },
    { id: 5, content: 'Matata Animation', image: "/images/song1.png" },
    { id: 6, content: 'DJ NNHT MIX', image: "/images/song2.png" },
    { id: 7, content: 'Hustler Challenge', image: "/images/song3.png" },
    { id: 8, content: 'Groovy JO 25Flow', image: "/images/song4.png" },
    { id: 9, content: 'Matata Animation', image: "/images/song1.png" },
    { id: 10, content: 'DJ NNHT MIX', image: "/images/song2.png" },
];

const MultiItemCarousel = () => {
    return (
        <Box sx={{ maxWidth: '100%', margin: '30px 0' }}>
            {/* Added Typography component aligned to the left */}
            <Typography
                variant="h5"
                component="h5"
                align="left"

                sx={{
                    fontSize: {
                        xs: '1.5rem',
                        sm: '1.5rem',
                        md: '1.8rem',
                    },
                    marginBottom: '24px',
                    marginLeft: '5px',
                    fontWeight: 600,
                    textAlign: 'left'
                }}
            >
                Trending in Kenya Today
            </Typography>

            <Carousel
                responsive={responsive}
                infinite={true}
                autoPlay={false}
                autoPlaySpeed={3000}
                keyBoardControl={true}
                customTransition="transform 500ms ease-in-out"
                transitionDuration={500}
                containerClass="carousel-container"
                removeArrowOnDeviceType={["mobile"]}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item"
            >
                {carouselItems.map((item) => (
                    <ItemCard key={item.id}>
                        {/* Image at the top */}
                        <img
                            src={item.image}
                            alt={item.content}
                            style={{
                                width: '100%',
                                height: '200px',
                                objectFit: 'cover',
                            }}
                        />
                        {/* Lower section with content as title */}
                        <CardContentStyled>
                            <Typography variant="body2" component="h6" gutterBottom>
                                {item.content}
                            </Typography>
                        </CardContentStyled>
                    </ItemCard>
                ))}
            </Carousel>
        </Box>
    );
};

export default MultiItemCarousel;
