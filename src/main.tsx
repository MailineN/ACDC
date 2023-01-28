import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import './lib/translation/i18n';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.Suspense fallback="Loading...">
    <App />
  </React.Suspense>
);
