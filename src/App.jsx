import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './HomePage'; // Import HomePage
import SignupForm from './SignupForm';
import Login from './Login';
import ForgotPassword from './ForgotPassword';
import Dashboard from './Dashboard';
import ResetPasswordPage from './ResetPasswordPage';

const App = () => {
  return (
    <Router>
      <div className='app-container'>
        {/* Routes */}
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignupForm />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route
            path='/reset-password/:resetToken'
            element={<ResetPasswordPage />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
