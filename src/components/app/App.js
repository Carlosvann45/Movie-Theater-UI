import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import NotFound from '../not-found/NotFound';
import LoginPage from '../login-page/LoginPage';
import UserProfile from '../user-profile.js/UserProfile';
import Layout from '../../utils/layout/Layout';
import RequireAuth from '../../utils/authorization/RequireAuth';
import Home from '../home/Home';
import Constants from '../../utils/Constants';
import PersistLogin from '../../utils/PersistLogin';

/**
 * Runs browser router to specific webpage.
 *
 * @returns page for user to view
 */
const App = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />
      {/* Private Routes */}
      <Route element={<PersistLogin />}>
        <Route element={<RequireAuth allowedRoles={[Constants.ROLES.Customer]} />}>
          <Route path="/" element={<Home />} />
          <Route path="/account" element={<UserProfile />} />
        </Route>
      </Route>
      {/* Catch all other routes */}
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
);

export default App;
