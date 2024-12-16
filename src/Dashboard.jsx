import React, { useState, useEffect } from 'react';
import { FaArrowsAlt, FaCompress } from 'react-icons/fa';
import logo from './images/programmer.png';
import Logout from './Logout';
import { FaUserCircle, FaExpandAlt, FaUsers } from 'react-icons/fa';
import Editor from '@monaco-editor/react';
import OnlineUsers from './OnlineUsers'; // Import OnlineUsers component
import './Dashboard.css';
import Sidebar from './Sidebar';

const Dashboard = () => {
  const [html, setHtml] = useState('<!-- Start coding in HTML! -->');
  const [css, setCss] = useState('/* Start coding in CSS! */');
  const [javascript, setJavascript] = useState(
    '// Start coding in JavaScript!'
  );

  const [output, setOutput] = useState('');
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState('all');
  // Options: 'all', 'html', 'css', 'javascript'
  const [fullName, setFullName] = useState('');
  const [showOnlineUsers, setShowOnlineUsers] = useState(false); // State to toggle online users dropdown

  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    setIsFullscreen((prev) => !prev);
  };

  // Fetch online users from the backend
  useEffect(() => {
    const fetchOnlineUsers = async () => {
      try {
        const response = await fetch(`${process.env.API_URL}/online-users`);
        const data = await response.json();
        setOnlineUsers(data);
      } catch (error) {
        console.error('Error fetching online users:', error);
      }
    };

    fetchOnlineUsers();
  }, []);

  // Combine HTML, CSS, and JavaScript into a single output
  useEffect(() => {
    const timeout = setTimeout(() => {
      const combinedCode = `
        <html>
          <head>
            <style>${css}</style>
          </head>
          <body>
            ${html}
            <script>${javascript}</script>
          </body>
        </html>
      `;
      setOutput(combinedCode);
    }, 500);
    return () => clearTimeout(timeout);
  }, [html, css, javascript]);

  // Retrieve user full name from storage
  useEffect(() => {
    const storedFullName =
      localStorage.getItem('userFullName') ||
      sessionStorage.getItem('userFullName');
    setFullName(storedFullName);
  }, []);

  const toggleOnlineUsers = () => {
    setShowOnlineUsers((prev) => !prev); // Toggle dropdown visibility
  };

  return (
    <div className='dashboard-container'>
      {/* Sidebar: Show only if isSidebarOpen is true */}
      {isSidebarOpen && <Sidebar />}
      <Sidebar className={isSidebarOpen ? 'visible' : ''} />

      {/* Navbar */}
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

      {/* Main Content */}
      <div className={`main-content ${isFullscreen ? 'fullscreen' : ''}`}>
        {/* Fullscreen Icon in the top-right corner */}
        <span
          className='fullscreen-toggle'
          onClick={toggleFullscreen}
          style={{
            position: 'absolute',
            top: '4px',
            right: '10px',
            fontSize: '25px',
            cursor: 'pointer',
            color: '#fff',
          }}
        >
          {isFullscreen ? (
            <FaCompress /> // Icon for exiting fullscreen
          ) : (
            <FaArrowsAlt /> // Icon for fullscreen
          )}
        </span>

        {/* Optionally, if you want a button at the bottom right to exit fullscreen */}
        {isFullscreen && (
          <span
            className='exit-fullscreen-toggle'
            onClick={toggleFullscreen}
            style={{
              position: 'fixed', // Use fixed positioning relative to the viewport
              bottom: '2px', // Position at the bottom of the viewport
              right: '10px', // Position at the right of the viewport
              fontSize: '20px', // Icon size
              cursor: 'pointer',
              color: '#fff',
              zIndex: 1000, // Ensure it is above other content
            }}
          >
            <FaCompress /> {/* Icon for exiting fullscreen */}
          </span>
        )}
        <div
          className={`editor-output-container ${
            activeView !== 'all' ? 'split-view' : ''
          }`}
        >
          {/* Editors */}
          <div
            className={`editor-section resizable ${
              activeView === 'all' ? '' : 'half-screen'
            }`}
          >
            {['html', 'css', 'javascript'].map((lang) => (
              <div
                key={lang}
                className={`editor-wrapper resizable ${
                  activeView === lang ? 'active-editor' : ''
                }`}
                style={{
                  display:
                    activeView === 'all' || activeView === lang
                      ? 'block'
                      : 'none',
                }}
              >
                <div className='editor-header'>
                  <h3>{lang.toUpperCase()} Editor</h3>
                  <FaExpandAlt
                    className='toggle-icon'
                    onClick={() =>
                      setActiveView(activeView === lang ? 'all' : lang)
                    }
                  />
                </div>
                <Editor
                  height='600px'
                  language={lang}
                  theme='vs-dark'
                  value={
                    lang === 'html' ? html : lang === 'css' ? css : javascript
                  }
                  onChange={(value) => {
                    if (lang === 'html') setHtml(value);
                    else if (lang === 'css') setCss(value);
                    else setJavascript(value);
                  }}
                />
              </div>
            ))}
          </div>

          {/* Output Section */}
          <div
            className={`output-section resizable ${
              activeView === 'all' ? '' : 'half-screen'
            }`}
            style={{
              display:
                activeView === 'all' || activeView !== 'all' ? 'block' : 'none',
            }}
          >
            <iframe
              srcDoc={output}
              title='Code Output'
              sandbox='allow-scripts'
              style={{ width: '100%', height: '100%', border: 'none' }}
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
