import React from 'react';
import { useLocation, Navigate, Outlet } from 'react-router';
import useAuth from '../hooks/useAuth';

const RequireAuth = ({ allowedRoles }) => {
  const { customerAuth } = useAuth();
  const location = useLocation();

  return (
    !customerAuth.customer
      ? <Navigate to="/login" state={{ from: location }} replace />
      : allowedRoles.includes(customerAuth.customer.role)
        ? <Outlet />
        : <Navigate to="/unauthorized" state={{ from: location }} replace />
  );
};

export default RequireAuth;
