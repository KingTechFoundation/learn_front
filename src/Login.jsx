import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${process.env.API_URL}/login`, {
        email,
        password,
      });

      // Extract token and user data
      const { token, user } = response.data;

      // Check if the response contains the token and user
      if (!token || !user) {
        throw new Error('No token or user data received.');
      }

      // Save token and user data
      if (rememberMe) {
        localStorage.setItem('authToken', token);
        localStorage.setItem('userFullName', user.full_name);
      } else {
        sessionStorage.setItem('authToken', token);
        sessionStorage.setItem('userFullName', user.full_name);
      }

      // Notify user and redirect
      toast.success(`Welcome, ${user.full_name}! Redirecting to dashboard...`);
      navigate('/dashboard');
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || 'Login failed. Try again.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='login-container'>
      <form onSubmit={handleSubmit} className='login-form'>
        <h2>Login</h2>
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
      <ToastContainer />
    </div>
  );
};

export default Login;
