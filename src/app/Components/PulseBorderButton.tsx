import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const PulseBorderButton = () => {
    return (
        <Box sx={{ position: 'relative', display: 'inline-block' }}>
            {/* Material UI Button */}
            <Button
                variant="outlined"
                sx={{
                    position: 'relative',
                    color: '#e50914',  // White text color
                    borderColor: 'white',  // White border color
                    borderWidth: '2px',
                    borderRadius: '8px',  // Set border radius to 10px
                    '&:hover': {
                        borderColor: 'white',  // Keep white border on hover
                        backgroundColor: '#e50914',  // Netflix red background on hover
                        borderWidth: '2px',
                        color: 'white'  // Ensure text stays white on hover
                    },
                    zIndex: 1,
                    minWidth: '250px',
                    padding: '8px 15px',
                    fontSize: '14px',
                    fontWeight: 600,
                    textTransform: 'none'
                }}
            >
                Create an Account to Start Streaming
            </Button>

            {/* Container for the first animated pulse */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    overflow: 'hidden',
                    pointerEvents: 'none',
                    borderRadius: '8px',  // Match button border radius
                    zIndex: 2  // Place animation above the border
                }}
            >
                {/* First animation - Top border pulse */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: '-50%',
                        width: '50%',
                        height: '3px',
                        background: 'linear-gradient(to right, transparent, #e50914 50%, transparent)',
                        animation: 'pulse-top 8s linear infinite',
                        '@keyframes pulse-top': {
                            '0%': { left: '-50%' },
                            '25%': { left: '100%' },
                            '25.001%': { left: '-50%' },
                            '100%': { left: '-50%' }
                        }
                    }}
                />

                {/* First animation - Right border pulse */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: '-50%',
                        right: 0,
                        width: '3px',
                        height: '50%',
                        background: 'linear-gradient(to bottom, transparent, #e50914 50%, transparent)',
                        animation: 'pulse-right 8s linear infinite',
                        '@keyframes pulse-right': {
                            '0%': { top: '-50%' },
                            '25%': { top: '-50%' },
                            '50%': { top: '100%' },
                            '50.001%': { top: '-50%' },
                            '100%': { top: '-50%' }
                        }
                    }}
                />

                {/* First animation - Bottom border pulse */}
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: 0,
                        right: '-50%',
                        width: '50%',
                        height: '3px',
                        background: 'linear-gradient(to left, transparent, #228B22 50%, transparent)',
                        animation: 'pulse-bottom 8s linear infinite',
                        '@keyframes pulse-bottom': {
                            '0%': { right: '-50%' },
                            '50%': { right: '-50%' },
                            '75%': { right: '100%' },
                            '75.001%': { right: '-50%' },
                            '100%': { right: '-50%' }
                        }
                    }}
                />

                {/* First animation - Left border pulse */}
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: '-50%',
                        left: 0,
                        width: '3px',
                        height: '50%',
                        background: 'linear-gradient(to top, transparent, #228B22 50%, transparent)',
                        animation: 'pulse-left 8s linear infinite',
                        '@keyframes pulse-left': {
                            '0%': { bottom: '-50%' },
                            '75%': { bottom: '-50%' },
                            '100%': { bottom: '100%' },
                            '100.001%': { bottom: '-50%' }
                        }
                    }}
                />
            </Box>

            {/* Container for the second animated pulse (delayed) */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    overflow: 'hidden',
                    pointerEvents: 'none',
                    borderRadius: '8px',  // Match button border radius
                    zIndex: 2  // Place animation above the border
                }}
            >
                {/* Second animation - Top border pulse (delayed) */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: '-50%',
                        width: '50%',
                        height: '3px',
                        background: 'linear-gradient(to right, transparent, #e50914 50%, transparent)',
                        animation: 'pulse-top 8s linear infinite',
                        animationDelay: '4s',  // 50% delay for second animation
                        '@keyframes pulse-top': {
                            '0%': { left: '-50%' },
                            '25%': { left: '100%' },
                            '25.001%': { left: '-50%' },
                            '100%': { left: '-50%' }
                        }
                    }}
                />

                {/* Second animation - Right border pulse (delayed) */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: '-50%',
                        right: 0,
                        width: '3px',
                        height: '50%',
                        background: 'linear-gradient(to bottom, transparent, #e50914 50%, transparent)',
                        animation: 'pulse-right 8s linear infinite',
                        animationDelay: '4s',  // 50% delay for second animation
                        '@keyframes pulse-right': {
                            '0%': { top: '-50%' },
                            '25%': { top: '-50%' },
                            '50%': { top: '100%' },
                            '50.001%': { top: '-50%' },
                            '100%': { top: '-50%' }
                        }
                    }}
                />

                {/* Second animation - Bottom border pulse (delayed) */}
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: 0,
                        right: '-50%',
                        width: '50%',
                        height: '3px',
                        background: 'linear-gradient(to left, transparent, #228B22 50%, transparent)',
                        animation: 'pulse-bottom 8s linear infinite',
                        animationDelay: '4s',  // 50% delay for second animation
                        '@keyframes pulse-bottom': {
                            '0%': { right: '-50%' },
                            '50%': { right: '-50%' },
                            '75%': { right: '100%' },
                            '75.001%': { right: '-50%' },
                            '100%': { right: '-50%' }
                        }
                    }}
                />

                {/* Second animation - Left border pulse (delayed) */}
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: '-50%',
                        left: 0,
                        width: '3px',
                        height: '50%',
                        background: 'linear-gradient(to top, transparent, #228B22 50%, transparent)',
                        animation: 'pulse-left 8s linear infinite',
                        animationDelay: '4s',  // 50% delay for second animation
                        '@keyframes pulse-left': {
                            '0%': { bottom: '-50%' },
                            '75%': { bottom: '-50%' },
                            '100%': { bottom: '100%' },
                            '100.001%': { bottom: '-50%' }
                        }
                    }}
                />
            </Box>
        </Box>
    );
};

export default PulseBorderButton;