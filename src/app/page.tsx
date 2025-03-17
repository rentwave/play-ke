"use client";
import Image from 'next/image';
import { Container, Typography, Button, Box, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

const HeroSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundColor: '#000',
  color: '#fff',
  textAlign: 'center',
  padding: '20px',
}));

const CTAButton = styled(Button)(({ theme }) => ({
  marginTop: '20px',
  backgroundColor: '#D32F2F', // Red
  color: '#fff',
  fontSize: '1.2rem',
  padding: '12px 24px',
  '&:hover': {
    backgroundColor: '#C62828',
  },
}));

const TrendingSection = styled(Container)(({ theme }) => ({
  marginTop: '50px',
  padding: '20px',
  textAlign: 'center',
  color: '#fff',
}));

export default function Home() {
  return (
    <>
      <HeroSection>
        <Image src="/images/Logo.png" alt="PlayKE Logo" width={250} height={120} priority />
        <Typography variant="h3" sx={{ mt: 3, color: '#FFD700', fontWeight: 'bold' }}>
          Stream the Best Content
        </Typography>
        <Typography variant="h6" sx={{ mt: 1, color: '#4CAF50', fontSize: '1.2rem' }}>
          Movies, Shows & Live Events
        </Typography>
        <CTAButton variant="contained" size="large">Start Streaming</CTAButton>
      </HeroSection>

      
    </>
  );
}
