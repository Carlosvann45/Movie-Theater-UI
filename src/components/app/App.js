import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import NotFound from '../not-found/NotFound';
import LoginPage from '../login-page/LoginPage';
import UserProfile from '../user-profile.js/UserProfile';
import Layout from '../layout/Layout';
import RequireAuth from '../authorization/RequireAuth';
import Home from '../home/Home';

/**
 * Runs browser router to specific webpage.
 *
 * @returns page for user to view
 */
const App = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      {/* Private Routes */}
      <Route element={<RequireAuth />}>
        <Route path="/account" element={<UserProfile />} />
      </Route>
      {/* Catch all other routes */}
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
);

export default App;
