import React, { useState } from 'react';
import axios from 'axios';
//import './ForgotPassword.css'; // Styling for this component

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      await axios.post(
        'http://localhost:5000/api/users/request-password-reset',
        {
          email,
        }
      );
      setMessage('Password reset email sent! Please check your inbox.');
    } catch (err) {
      setError(
        err.response?.data?.message || 'Something went wrong. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='forgot-password-container'>
      <form onSubmit={handleSubmit} className='forgot-password-form'>
        <h2>Forgot Password</h2>
        {message && <p className='success-message'>{message}</p>}
        {error && <p className='error-message'>{error}</p>}

        <div className='form-group'>
          <label htmlFor='email'>Enter your email</label>
          <input
            type='email'
            id='email'
            placeholder='Enter your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <button type='submit' className='submit-button' disabled={loading}>
          {loading ? 'Sending...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
