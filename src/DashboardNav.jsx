import React from 'react';
import logo from './images/programmer.png';
import OnlineUsers from './OnlineUsers';
import { FaUserCircle, FaUsers } from 'react-icons/fa';
const DashboardNav = () => {
  return (
    <div>
      <nav className='navbar'>
        <div className='navbar-brand'>
          <img src={logo} />
        </div>

        <div className='navbar-icons'>
          <div className='profile-section'>
            <FaUserCircle className='profile-icon' />
            <span className='profile-name'>{fullName}</span>
          </div>

          {/* Online Users Button */}
          <div className='online-users-btn' onClick={toggleOnlineUsers}>
            <FaUsers className='nav-icon' />
            <span>Online({onlineUsers.length})</span>
          </div>
        </div>
      </nav>

      {/* Dropdown for online users */}
      {showOnlineUsers && (
        <div className='online-users-dropdown'>
          <OnlineUsers onlineUsers={onlineUsers} />
        </div>
      )}
    </div>
  );
};

export default DashboardNav;
