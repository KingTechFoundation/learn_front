import React from 'react';
import Typical from 'react-typical';
import { Button } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import SchoolIcon from '@mui/icons-material/School';
import { motion } from 'framer-motion';
import Particles from 'react-tsparticles';

const HeroSection = () => {
  const hours = new Date().getHours();
  const greeting =
    hours < 12
      ? 'Good Morning'
      : hours < 18
      ? 'Good Afternoon'
      : 'Good Evening';

  return (
    <div
      style={{
        position: 'relative',
        height: '100vh',
        overflow: 'hidden',
        color: '#fff',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Particle Background */}
      <Particles
        options={{
          background: {
            color: '#000',
          },
          particles: {
            number: {
              value: 80,
            },
            color: {
              value: '#FFD700',
            },
            shape: {
              type: 'circle',
            },
            move: {
              direction: 'none',
              enable: true,
              speed: 2,
            },
          },
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: -2,
        }}
      />

      {/* Semi-Transparent Overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.6)',
          zIndex: -1,
        }}
      ></div>

      {/* Floating Tips Widget */}
      <motion.div
        className='floating-tips'
        animate={{
          y: [0, -15, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 3,
        }}
        style={{
          position: 'absolute',
          top: '15%',
          left: '10%',
          background: '#FFD700',
          padding: '20px',
          borderRadius: '15px',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
          color: '#000',
          fontWeight: 'bold',
          textAlign: 'left',
        }}
      >
        <h3 style={{ margin: 0, fontSize: '1.2rem' }}>Coding Tip:</h3>
        <p style={{ fontSize: '1rem', margin: '10px 0 0' }}>
          "Write clean code. Readability counts more than cleverness!"
        </p>
      </motion.div>

      {/* Greeting */}
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{
          marginBottom: '10px',
          fontSize: '1.8rem',
          color: '#FFD700',
          textShadow: '1px 1px 5px rgba(0, 0, 0, 0.7)',
        }}
      >
        {greeting}
      </motion.h2>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{
          fontSize: '4rem',
          fontWeight: 'bold',
          marginBottom: '20px',
          textShadow: '3px 3px 15px rgba(0, 0, 0, 0.9)',
        }}
      >
        Unlock Your Coding Potential
      </motion.h1>

      {/* Dynamic Typewriter Text */}
      <Typical
        steps={[
          'Learn HTML 🌐',
          2000,
          'Master CSS 🎨',
          2000,
          'Build with JavaScript ⚡',
          2000,
          'Explore Python 🐍',
          2000,
        ]}
        loop={Infinity}
        wrapper='h2'
        style={{
          fontSize: '2.2rem',
          marginBottom: '40px',
          color: '#FFFFFF',
          textShadow: '2px 2px 15px rgba(0, 0, 0, 0.9)',
          zIndex: 1,
        }}
      />

      {/* Call-to-Action Buttons */}
      <div style={{ display: 'flex', gap: '20px' }}>
        <Button
          variant='contained'
          size='large'
          startIcon={<CodeIcon />}
          style={{
            backgroundColor: '#FF5733',
            color: '#fff',
            fontSize: '1.2rem',
            padding: '10px 25px',
            boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.5)',
            borderRadius: '30px',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0px 8px 20px rgba(0, 0, 0, 0.7)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0px 6px 15px rgba(0, 0, 0, 0.5)';
          }}
        >
          Start Learning
        </Button>
        <Button
          variant='outlined'
          size='large'
          startIcon={<SchoolIcon />}
          style={{
            borderColor: '#FFD700',
            color: '#FFD700',
            fontSize: '1.2rem',
            padding: '10px 25px',
            borderWidth: '2px',
            borderRadius: '30px',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0px 8px 20px rgba(0, 0, 0, 0.7)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          View Courses
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
