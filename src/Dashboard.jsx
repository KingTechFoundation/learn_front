import React, { useState, useEffect } from 'react';
import {
  FaUserCircle,
  FaEnvelope,
  FaComments,
  FaBars,
  FaExpandAlt,
} from 'react-icons/fa';
import Editor from '@monaco-editor/react';
import './Dashboard.css';

const Dashboard = () => {
  const [html, setHtml] = useState('<!-- Start coding in HTML! -->');
  const [css, setCss] = useState('/* Start coding in CSS! */');
  const [javascript, setJavascript] = useState(
    '// Start coding in JavaScript!'
  );
  const [output, setOutput] = useState('');
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [activeView, setActiveView] = useState('all'); // Options: 'all', 'html', 'css', 'javascript'

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

  return (
    <div className='dashboard-container'>
      {/* Navbar */}
      <nav className='navbar'>
        <div className='navbar-brand'>E-Learning Dashboard</div>
        <div className='navbar-icons'>
          <FaComments className='nav-icon' />
          <FaEnvelope className='nav-icon' />
          <FaBars className='nav-icon' />
        </div>
      </nav>

      {/* Main Content */}
      <div className='main-content'>
        <div
          className={`editor-output-container ${
            activeView !== 'all' ? 'split-view' : ''
          }`}
        >
          {/* Editors */}
          <div
            className={`editor-section ${
              activeView === 'all' ? '' : 'half-screen'
            }`}
          >
            {['html', 'css', 'javascript'].map((lang) => (
              <div
                key={lang}
                className={`editor-wrapper ${
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
                  height='200px'
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
            className={`output-section ${
              activeView === 'all' ? '' : 'half-screen'
            }`}
            style={{
              display:
                activeView === 'all' || activeView !== 'all' ? 'block' : 'none',
            }}
          >
            <h3>Live Output</h3>
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
