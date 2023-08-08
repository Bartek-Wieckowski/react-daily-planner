import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { DailyPlannerProvider } from './context/DailyPlannerContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DailyPlannerProvider>
      <App />
    </DailyPlannerProvider>
  </React.StrictMode>
);
