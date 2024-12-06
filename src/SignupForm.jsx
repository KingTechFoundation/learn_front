import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './SignupForm.css';

const SignupForm = () => {
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
      toast.error('All fields are required.');
      return;
    }

    try {
      setLoading(true);
      setProgress(0);

      // Simulate loader progress
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
      toast.success(response.data.message);

      // Reset the form
      setFormData({ full_name: '', email: '', password: '' });
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    }
  };

  if (registrationSuccess) {
    return (
      <div className='success-message-container'>
        <div className='success-message'>
          <h1>🎉 Registration Successful!</h1>
          <p>
            Please check your email for verification. We're excited to have you
            on board!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='signup-form-container'>
      <ToastContainer />
      <div className='form-header'>
        <h2>Join Our E-Learning Community</h2>
        <p>Sign up and start learning today!</p>
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
              placeholder='Enter your full name'
              required
            />
          </div>
          <div className='form-group'>
            <label>Email</label>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              placeholder='Enter your email'
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
              placeholder='Enter your password'
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
