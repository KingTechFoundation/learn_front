import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css';
import './ForgotPassword.css'; // Apply custom CSS if needed

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${process.env.API_URL}/request-password-reset`, {
        email,
      });
      toast.success('Password reset email sent! Please check your inbox.', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
      });
      setEmail('');
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          'Something went wrong. Please try again.',
        {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
        }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='forgot-password-container'>
      <form onSubmit={handleSubmit} className='forgot-password-form'>
        <h2>Forgot Password</h2>
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
      {/* ToastContainer must be included for the toast notifications */}
      <ToastContainer />
    </div>
  );
};

export default ForgotPassword;
