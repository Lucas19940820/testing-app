import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // You can link to your global CSS file here
import App from './App'; // This is your main App component

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
