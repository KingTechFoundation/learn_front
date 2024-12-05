import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; // Create a CSS file for styling

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(
        'http://localhost:5000/api/users/login',
        {
          email,
          password,
        }
      );

      // Save token to localStorage or sessionStorage
      if (rememberMe) {
        localStorage.setItem('authToken', response.data.token);
      } else {
        sessionStorage.setItem('authToken', response.data.token);
      }

      alert('Login successful!');
      window.location.href = '/dashboard'; // Redirect to dashboard
    } catch (err) {
      setError(
        err.response?.data?.message || 'Something went wrong. Please try again.'
      );
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
    </div>
  );
};

export default Login;
