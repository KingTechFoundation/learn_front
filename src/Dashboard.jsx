import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import './Dashboard.css';

const Dashboard = () => {
  const [html, setHtml] = useState('<!-- Start coding in HTML! -->');
  const [css, setCss] = useState('/* Start coding in CSS! */');
  const [javascript, setJavascript] = useState(
    '// Start coding in JavaScript!'
  );
  const [output, setOutput] = useState('');

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
    }, 500); // Add a small debounce for better performance
    return () => clearTimeout(timeout);
  }, [html, css, javascript]);

  // Load example code
  const loadExample = () => {
    setHtml(`
      <div id="app">
        <h1>Hello, World!</h1>
        <button onclick="changeColor()">Click Me!</button>
      </div>
    `);

    setCss(`
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 20px;
      }
      #app {
        text-align: center;
        margin-top: 50px;
      }
      button {
        padding: 10px 20px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
      }
      button:hover {
        background-color: #0056b3;
      }
    `);

    setJavascript(`
      function changeColor() {
        document.getElementById('app').style.color = 'red';
      }
    `);
  };

  return (
    <div className='dashboard-container'>
      <h1>Interactive Learning Dashboard</h1>

      {/* Load Example Button */}
      <button className='load-example-button' onClick={loadExample}>
        Load Example
      </button>

      {/* Language-specific editors */}
      <div className='editor-section'>
        <div className='editor-wrapper'>
          <h3>HTML Editor</h3>
          <Editor
            height='200px'
            language='html'
            theme='vs-dark'
            value={html}
            onChange={(value) => setHtml(value)}
          />
        </div>
        <div className='editor-wrapper'>
          <h3>CSS Editor</h3>
          <Editor
            height='200px'
            language='css'
            theme='vs-dark'
            value={css}
            onChange={(value) => setCss(value)}
          />
        </div>
        <div className='editor-wrapper'>
          <h3>JavaScript Editor</h3>
          <Editor
            height='200px'
            language='javascript'
            theme='vs-dark'
            value={javascript}
            onChange={(value) => setJavascript(value)}
          />
        </div>
      </div>

      {/* Output Section */}
      <div className='output-section'>
        <h3>Live Output</h3>
        <iframe
          srcDoc={output}
          title='Code Output'
          sandbox='allow-scripts'
          style={{
            border: '1px solid #ddd',
            width: '100%',
            height: '400px',
            backgroundColor: '#fff',
          }}
        ></iframe>
      </div>
    </div>
  );
};

export default Dashboard;
