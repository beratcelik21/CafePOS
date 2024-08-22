import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/main.css'; // Ana stil dosyanızı içe aktarın
import App from './App'; // Ana uygulama bileşeni

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
