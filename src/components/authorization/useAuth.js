import { useContext } from 'react';
import CustomerContext from './AuthContext';

const useAuth = () => useContext(CustomerContext);

export default useAuth;
