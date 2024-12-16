import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Get the JWT token from storage (session or local)
      const token =
        localStorage.getItem('authToken') ||
        sessionStorage.getItem('authToken');

      if (!token) {
        return toast.error('No user is logged in.');
      }

      // Send logout request to the backend
      const response = await axios.post(
        `${process.env.API_URL}/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send JWT token with the request
          },
        }
      );

      // Clear token from local/session storage
      localStorage.removeItem('authToken');
      sessionStorage.removeItem('authToken');
      localStorage.removeItem('userFullName');
      sessionStorage.removeItem('userFullName');

      // Show success message and navigate to login page
      toast.success('You have logged out successfully.');
      navigate('/login');
    } catch (err) {
      // Handle specific errors
      if (err.response && err.response.status === 403) {
        toast.error('You are not authorized to log out.');
      } else {
        toast.error('An error occurred during logout. Please try again.');
      }
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
