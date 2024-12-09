import React, { useEffect, useState } from 'react';
import {
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  useTheme,
} from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import { motion } from 'framer-motion';

// Image paths for the carousel (will be replaced later with actual images)
const slides = [
  {
    image: '/images/tim-berners-lee.jpg', // Replace with the actual image path later
    name: 'Tim Berners-Lee',
    role: 'Inventor of the World Wide Web',
    description:
      'A visionary who changed the world by creating the web, revolutionizing communication and information sharing worldwide.',
  },
  {
    image: '/images/ada-lovelace.jpg', // Replace with the actual image path later
    name: 'Ada Lovelace',
    role: 'Pioneering Programmer',
    description:
      'The world’s first computer programmer, known for her work on Charles Babbage’s early mechanical general-purpose computer.',
  },
  // Add more slides as needed
];

const PioneerSliders = () => {
  const theme = useTheme(); // Ensure useTheme is correctly imported
  const [animatedSlideIndex, setAnimatedSlideIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedSlideIndex((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <Container style={{ padding: '2rem 0' }}>
      <Typography
        variant='h2'
        align='center'
        gutterBottom
        style={{
          marginBottom: '2rem',
          color: theme.palette.primary.main,
          textShadow: '1px 1px 5px rgba(0, 0, 0, 0.5)',
        }}
      >
        Pioneer Sliders
      </Typography>
      <Carousel
        interval={5000} // Slide change interval
        animation='slide'
        navButtonsAlwaysVisible={false}
        indicators
      >
        {slides.map((slide, index) => (
          <Card
            key={index}
            style={{
              maxWidth: '600px',
              margin: '0 auto',
              backgroundColor: theme.palette.background.paper,
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)',
              borderRadius: '15px',
            }}
          >
            <CardMedia
              component='img'
              alt={slide.name}
              height='400'
              image={slide.image} // Image will be replaced later
              style={{
                objectFit: 'cover',
                filter: 'brightness(0.5)',
                borderTopLeftRadius: '15px',
                borderTopRightRadius: '15px',
              }}
            />
            <CardContent>
              <Typography
                variant='h5'
                component='div'
                style={{
                  color: theme.palette.text.primary,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}
              >
                {slide.name}
              </Typography>
              <Typography
                variant='subtitle1'
                color='textSecondary'
                style={{ textAlign: 'center' }}
              >
                {slide.role}
              </Typography>
              <Typography
                variant='body2'
                color='textSecondary'
                component='p'
                style={{
                  marginTop: '10px',
                  textAlign: 'center',
                  padding: '0 20px',
                }}
              >
                {slide.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Carousel>
    </Container>
  );
};

const SuccessStories = () => {
  return (
    <Container style={{ padding: '2rem 0' }}>
      <Typography
        variant='h2'
        align='center'
        gutterBottom
        style={{
          marginBottom: '2rem',
          color: '#FFD700',
          textShadow: '2px 2px 10px rgba(0, 0, 0, 0.9)',
        }}
      >
        Interactive Slides
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              background: '#FFD700',
              padding: '20px',
              borderRadius: '15px',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
              color: '#000',
              fontWeight: 'bold',
              textAlign: 'left',
            }}
          >
            <Typography variant='h4' gutterBottom>
              Success Story: John Doe
            </Typography>
            <Typography variant='body1'>
              John transformed his career by learning to code. "It wasn't easy,"
              he says, "but with the right guidance and persistence, anyone can
              do it!"
            </Typography>
          </motion.div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              background: '#FFD700',
              padding: '20px',
              borderRadius: '15px',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
              color: '#000',
              fontWeight: 'bold',
              textAlign: 'left',
            }}
          >
            <Typography variant='h4' gutterBottom>
              Success Story: Emily Smith
            </Typography>
            <Typography variant='body1'>
              Emily turned her passion for coding into a successful career as a
              software engineer. "The journey was challenging," she admits, "but
              worth every bit of effort."
            </Typography>
          </motion.div>
        </Grid>
      </Grid>
    </Container>
  );
};

const CarouselSection = () => {
  return (
    <div style={{ backgroundColor: '#282c34', padding: '4rem 0' }}>
      <PioneerSliders />
      <SuccessStories />
    </div>
  );
};

export default CarouselSection;
