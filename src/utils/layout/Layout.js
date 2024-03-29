import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '../../components/navigation/Navigation';

const Layout = () => (
  <main>
    <main>
      <Navigation />
      <Outlet />
    </main>
  </main>
);

export default Layout;
