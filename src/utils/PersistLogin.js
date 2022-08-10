import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { getCustomerInfo, refreshCustomerToken } from '../components/login-page/LoginPageService';
import DecodeCookie from './cookies/DecodeCookie';
import DeleteCookie from './cookies/DeleteCookie';
import useAuth from './hooks/useAuth';

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState(false);
  const { customerAuth, setCustomerAuth } = useAuth();
  // jwtDecode(refresherToken).exp * 1000 >
  useEffect(() => {
    const refreshCustomer = async () => {
      const decodedCookie = DecodeCookie();
      const { refresherToken } = decodedCookie.tokens;

      if (refresherToken && decodedCookie?.customer?.email) {
        if (new Date().getTime()) {
          await refreshCustomerToken(customerAuth, setCustomerAuth);

          await getCustomerInfo(
            decodedCookie.customer.email, customerAuth, setCustomerAuth, setApiError
          );
        } else {
          DeleteCookie();
        }
      }
    };

    if (!customerAuth?.tokens?.accessToken) {
      refreshCustomer();

      setIsLoading(false);
    } else setIsLoading(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isLoading ? '' : <Outlet />}
    </>
  );
};

export default PersistLogin;
