import React from 'react';
import { useLocation, Navigate, Outlet } from 'react-router';
import useAuth from './useAuth';

const RequireAuth = () => {
  const { customerAuth } = useAuth();
  const location = useLocation();

  return (
    customerAuth.user ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
