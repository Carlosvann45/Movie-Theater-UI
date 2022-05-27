import React, { createContext, useState } from 'react';

const CustomerContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [customerAuth, setCustomerAuth] = useState({});

  return (
    <CustomerContext.Provider value={{ customerAuth, setCustomerAuth }}>
      {children}
    </CustomerContext.Provider>
  );
};

export default CustomerContext;
