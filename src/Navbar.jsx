import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from './images/programmer.png';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NightlightRoundIcon from '@mui/icons-material/NightlightRound';
import Login from './Login'; // Import the Login component
import SignupForm from './SignupForm'; // Import the SignupForm component

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [showLogin, setShowLogin] = useState(false); // State for showing login modal
  const [showSignup, setShowSignup] = useState(false); // State for showing signup modal

  // Handle Drawer Toggle
  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
  };

  // Handle Theme Toggle
  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    document.body.className = isDarkTheme ? 'light-theme' : 'dark-theme';
  };

  // Close both modals
  const closeModals = () => {
    setShowLogin(false);
    setShowSignup(false);
  };

  return (
    <>
      <AppBar
        position='fixed'
        sx={{
          backgroundColor: isDarkTheme ? '#333' : '#fff',
          color: isDarkTheme ? '#fff' : '#000',
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* Logo and Title */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src={logo}
              alt='Logo'
              style={{ height: '40px', marginRight: '10px' }}
            />
            <Typography
              variant='h6'
              sx={{
                display: { xs: 'none', sm: 'block' },
                whiteSpace: 'nowrap',
              }}
            >
              codelearn
            </Typography>
          </div>

          {/* Desktop Links */}
          <div className='desktop-links'>
            {['Home', 'Courses', 'Signup', 'Login'].map((text, index) => (
              <Link
                key={index}
                to={
                  text === 'Login' || text === 'Signup'
                    ? '#'
                    : `/${text.toLowerCase()}`
                }
                className='nav-link'
                onClick={
                  text === 'Login'
                    ? () => {
                        closeModals(); // Close signup modal if it's open
                        setShowLogin(true); // Open login modal
                      }
                    : text === 'Signup'
                    ? () => {
                        closeModals(); // Close login modal if it's open
                        setShowSignup(true); // Open signup modal
                      }
                    : undefined
                }
              >
                {text}
              </Link>
            ))}
          </div>

          {/* Theme Toggle */}
          <IconButton
            onClick={toggleTheme}
            sx={{
              backgroundColor: isDarkTheme ? '#555' : '#eee',
              color: isDarkTheme ? '#fff' : '#000',
              borderRadius: '5px',
              transition: 'background-color 0.3s',
            }}
          >
            {isDarkTheme ? <WbSunnyIcon /> : <NightlightRoundIcon />}
          </IconButton>

          {/* Hamburger Menu for Mobile */}
          <IconButton
            edge='end'
            onClick={toggleDrawer(true)}
            sx={{
              display: { sm: 'none' },
              color: isDarkTheme ? 'white' : 'black', // White for dark theme, black for light theme
              transform: 'scale(1.2)', // Slightly enlarges the icon for a bolder look
            }}
          >
            <MenuIcon />
          </IconButton>

          {/* Drawer */}
          <Drawer
            anchor='right'
            open={isDrawerOpen}
            onClose={toggleDrawer(false)}
          >
            <List sx={{ width: '250px' }}>
              {['Home', 'Courses', 'Login', 'Signup'].map((text, index) => (
                <ListItem button onClick={toggleDrawer(false)} key={index}>
                  <ListItemText>
                    <span
                      onClick={
                        text === 'Login'
                          ? () => {
                              closeModals();
                              setShowLogin(true);
                            }
                          : text === 'Signup'
                          ? () => {
                              closeModals();
                              setShowSignup(true);
                            }
                          : undefined
                      }
                    >
                      {text}
                    </span>
                  </ListItemText>
                </ListItem>
              ))}
            </List>
          </Drawer>
        </Toolbar>
      </AppBar>

      {/* Floating Login Modal */}
      {showLogin && (
        <div className='login-modal'>
          <div className='modal-overlay' onClick={closeModals} />
          <div className='login-modal-content'>
            <Login onClose={closeModals} />
          </div>
        </div>
      )}

      {/* Floating Signup Modal */}
      {showSignup && (
        <div className='signup-modal'>
          <div className='modal-overlay' onClick={closeModals} />
          <div className='signup-modal-content'>
            <SignupForm onClose={closeModals} />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
