import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import './lib/translation/i18n';
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <React.Suspense fallback="Loading...">
      <App />
    </React.Suspense>
  </React.StrictMode>
);
