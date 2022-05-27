import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '../navigation/Navigation';

const Layout = () => (
  <main>
    <Navigation />
    <Outlet />
  </main>
);

export default Layout;
