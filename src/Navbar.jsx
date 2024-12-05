import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from './images/programmer.png';
import './Navbar.css'; // Custom styles for the navbar
import CourseLinks from './CourseLinks';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle Hamburger Menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className='navbar'>
      <div className='navbar-container'>
        {/* Logo */}
        <div className='navbar-logo'>
          <img src={logo} alt='Logo' />
          <span className='navbar-title'>E-Learning Platform</span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className={`navbar-links ${isMenuOpen ? 'open' : ''}`}>
          <Link to='/' className='navbar-link'>
            Home
          </Link>
          <div className='dropdown'>
            <button className='dropdown-btn'>Courses</button>
            <div className='dropdown-menu'>
              <CourseLinks />
            </div>
          </div>
          <Link to='/resources' className='navbar-link'>
            Resources
          </Link>
          <Link to='/community' className='navbar-link'>
            Community
          </Link>
          <Link to='/about' className='navbar-link'>
            About Us
          </Link>
          <Link to='/support' className='navbar-link'>
            Contact Support
          </Link>
        </nav>

        {/* Right Section (Login & Signup) */}
        <div className='navbar-right'>
          <Link to='/login' className='btn btn-outline'>
            Login
          </Link>
          <Link to='/signup' className='btn btn-primary'>
            Signup
          </Link>
        </div>

        {/* Hamburger Menu */}
        <button className='hamburger' onClick={toggleMenu}>
          <span className='hamburger-line'></span>
          <span className='hamburger-line'></span>
          <span className='hamburger-line'></span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
