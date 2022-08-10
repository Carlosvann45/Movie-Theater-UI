import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter, Route, Routes
} from 'react-router-dom';
import './index.css';
import App from './components/app/App';
import LoadingSpinner from './components/loading-spinner/LoadingSpinner';
import { AuthProvider } from './utils/authorization/AuthContext';

/**
 * Render App
 */
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
    <LoadingSpinner />
  </React.StrictMode>,
  document.getElementById('root')
);
