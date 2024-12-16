import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './OnlineUsers.css'; // Add your custom CSS for styling

const OnlineUsers = () => {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch online users on component mount
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
      <h3>Online({onlineUsers.length}) </h3>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className='error-message'>{error}</p>
      ) : onlineUsers.length === 0 ? (
        <p>No users are currently online.</p>
      ) : (
        <>
          <ul>
            {onlineUsers.map((user) => (
              <li key={user.id || user.full_name}>
                <span>{user.full_name}</span> {/* Display user name */}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default OnlineUsers;
