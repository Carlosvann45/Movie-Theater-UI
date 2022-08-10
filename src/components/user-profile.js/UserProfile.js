import React from 'react';
import classes from './UserProfile.module.css';
import useAuth from '../../utils/hooks/useAuth';

const UserProfile = () => {
  const { customerAuth } = useAuth();
  return (
    <div className={classes.pageWrapper}>
      {`Hello ${customerAuth.customer.firstname} and welcome to MT Enterprises!`}
    </div>
  );
};

export default UserProfile;
