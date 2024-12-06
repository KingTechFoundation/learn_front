import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { ToastContainer, toast } from 'react-toastify'; // Import Toastify for notifications
import 'react-toastify/dist/ReactToastify.css'; // Import default styles for Toastify
import './Login.css'; // Create a CSS file for styling

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // Initialize useNavigate for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${process.env.API_URL}/login`, {
        email,
        password,
      });

      // Save token to localStorage or sessionStorage
      if (rememberMe) {
        localStorage.setItem('authToken', response.data.token);
      } else {
        sessionStorage.setItem('authToken', response.data.token);
      }

      // Notify user about successful login using toast
      toast.success('Login successful! Redirecting to dashboard...');

      // Navigate to dashboard
      navigate('/dashboard');
    } catch (err) {
      // Handle error gracefully and show toast notification
      setError(
        err.response?.data?.message || 'Something went wrong. Please try again.'
      );
      toast.error(error || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='login-container'>
      <form onSubmit={handleSubmit} className='login-form'>
        <h2>Login</h2>

        {/* Display error message if there is any */}
        {error && <p className='error-message'>{error}</p>}

        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            placeholder='Enter your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            placeholder='Enter your password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className='form-remember-me'>
          <label>
            <input
              type='checkbox'
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            Remember Me
          </label>
        </div>

        <button type='submit' className='login-button' disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <p className='forgot-password'>
          <a href='/forgot-password'>Forgot Password?</a>
        </p>
      </form>

      {/* Toastify container to display notifications */}
      <ToastContainer />
    </div>
  );
};

export default Login;
