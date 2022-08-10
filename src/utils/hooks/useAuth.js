import { useContext } from 'react';
import CustomerContext from '../authorization/AuthContext';

const useAuth = () => useContext(CustomerContext);

export default useAuth;
