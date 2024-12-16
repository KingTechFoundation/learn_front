import React, { useState, useRef } from 'react';
import './Sidebar.css'; // Import the CSS file for styles
import Logout from './Logout';

const Sidebar = () => {
  const [sidebarWidth, setSidebarWidth] = useState(250); // Default width of the sidebar
  const sidebarRef = useRef(null);
  const isResizing = useRef(false); // To track if resizing is active
  const startX = useRef(0); // To store initial mouse position during resize

  // Mouse down handler to initiate resizing
  const onMouseDown = (e) => {
    isResizing.current = true;
    startX.current = e.clientX; // Store starting mouse position
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  // Mouse move handler to resize the sidebar
  const onMouseMove = (e) => {
    if (isResizing.current) {
      const delta = e.clientX - startX.current;
      const newWidth = Math.min(
        Math.max(100, sidebarWidth + delta),
        window.innerWidth / 2
      ); // Prevent resizing beyond 100px and half of the window width
      setSidebarWidth(newWidth);
    }
  };

  // Mouse up handler to stop resizing
  const onMouseUp = () => {
    isResizing.current = false;
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  return (
    <div
      className='sidebar'
      style={{ width: `${sidebarWidth}px` }}
      ref={sidebarRef}
    >
      <h2>Sidebar</h2>
      <ul>
        <li>Introduction To Web</li>
        <li>The Do's and The Dont's</li>
        <li>Road Map To FullStack Dev</li>
        <li>Basics</li>
        <li>Intermediate</li>
        <li>Master</li>
        <li>Advanced</li>
        <li>Codding Challenges</li>
        <li>Backend Intergration</li>
        <li>Projects</li>
        <li>Certifications</li>
        <li>Interviews</li>


        <Logout />
      </ul>
      <div className='resize-handle' onMouseDown={onMouseDown} />
    </div>
  );
};

export default Sidebar;
