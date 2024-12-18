import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './OnlineUsers.css';

const OnlineUsers = () => {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOnlineUsers = async () => {
      try {
        const response = await axios.get(`${process.env.API_URL}/online-users`);
        setOnlineUsers(response.data);
      } catch (err) {
        setError('Error fetching online users. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchOnlineUsers();
  }, []);

  return (
    <div className='online-users'>
      
      {loading ? (
        <p className='loading-message'>Loading...</p>
      ) : error ? (
        <p className='error-message'>{error}</p>
      ) : onlineUsers.length === 0 ? (
        <p>No users are currently online.</p>
      ) : (
        <ul>
          {onlineUsers.map((user) => (
            <li key={user.id || user.full_name}>
              <span>{user.full_name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OnlineUsers;
