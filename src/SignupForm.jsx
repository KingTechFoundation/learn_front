import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './SignupForm.css';

const SignupForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { full_name, email, password } = formData;

    if (!full_name || !email || !password) {
      toast.error('All fields are required.', { className: 'error-toast' });
      return;
    }

    try {
      setLoading(true);
      setProgress(0);

      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 200);

      const response = await axios.post(
        `${process.env.API_URL}/signup`,
        formData
      );

      setLoading(false);
      setRegistrationSuccess(true);
      toast.success(response.data.message, { className: 'success-toast' });

      setFormData({ full_name: '', email: '', password: '' });
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.data) {
        toast.error(error.response.data.message, { className: 'error-toast' });
      } else {
        toast.error('Something went wrong. Please try again.', {
          className: 'error-toast',
        });
      }
    }
  };

  if (registrationSuccess) {
    return (
      <div className='success-message-container'>
        <div className='success-message'>
          <h1>✅</h1>
          <p>Registration Successful!</p>
          <p>Please check your email for verification.</p>
        </div>
      </div>
    );
  }

  return (
    <div className='signup-form-container'>
      <ToastContainer />
      <button onClick={onClose} className='close-button'>
        &times;
      </button>

      <div className='form-header'>
        <h2>Unlock Your Potential</h2>
        <p>Join a community of learners and start your journey today!</p>
      </div>
      {loading ? (
        <div className='loader'>
          <div className='rotating-circle'></div>
          <p>{progress}%</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className='signup-form'>
          <div className='form-group'>
            <label>Full Name</label>
            <input
              type='text'
              name='full_name'
              value={formData.full_name}
              onChange={handleChange}
              placeholder='Your Name'
              required
            />
          </div>
          <div className='form-group'>
            <label>Email Address</label>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              placeholder='example@example.com'
              required
            />
          </div>
          <div className='form-group'>
            <label>Password</label>
            <input
              type='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              placeholder='Create a password'
              required
            />
          </div>
          <button type='submit' className='submit-button' disabled={loading}>
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
      )}
    </div>
  );
};

export default SignupForm;
