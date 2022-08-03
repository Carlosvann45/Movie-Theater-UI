import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import classes from './LoginPage.module.css';
import RegistrationModal from '../registration-modal/RegistrationPage';
import logInCustomer from './LoginPageService';
import useAuth from '../authorization/useAuth';

/**
 * @name LoginPage
 * @description Displays a form for a user to log in to an account
 */
const LoginPage = () => {
  const navigate = useNavigate();
  const { setCustomerAuth } = useAuth();
  const [visable, setVisable] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [signInCreds, setSignInCreds] = useState({});
  const [apiError, setApiError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loggedIn = await logInCustomer(signInCreds, setCustomerAuth, setApiError);

    if (loggedIn) {
      navigate('/account', { replace: true });
    }
  };

  const handleOnChange = (e) => {
    setSignInCreds({ ...signInCreds, [e.target.name]: e.target.value });
  };

  return (
    <div className={classes.pageContainer}>
      <form className={classes.login} onSubmit={handleSubmit}>
        <h4
          className={apiError ? classes.titleError : classes.title}
        >
          Log in to MTE account
        </h4>
        {apiError && <p className={classes.apiError}>{apiError}</p>}
        <div className={classes.loginField} aria-label=" Enter email address">
          <label htmlFor="email">
            <p id="email" className={classes.label}>Email Address</p>
            <input
              name="email"
              placeholder="example@example.com"
              type="text"
              aria-labelledby="email"
              autoComplete="email"
              className={classes.input}
              onChange={handleOnChange}
              value={signInCreds.email}
            />
          </label>
        </div>
        <div className={classes.loginField} aria-label=" Enter password">
          <label htmlFor="password">
            <p id="password" className={classes.label}>Password</p>
            <div className={classes.passwordInput}>
              <input
                name="password"
                type={visable ? 'password' : 'text'}
                aria-labelledby="username"
                autoComplete="current-password"
                className={classes.input}
                onChange={handleOnChange}
                value={signInCreds.password}
              />
              <button type="button" className={classes.passwordIcon} onClick={() => setVisable(!visable)}>
                {visable ? <VisibilityIcon style={{ color: 'grey' }} /> : <VisibilityOffIcon style={{ color: 'grey' }} />}
              </button>
            </div>
          </label>
        </div>
        <div className={classes.buttonContainer}>
          <button type="submit" className={classes.loginButton}>
            <span className={classes.buttonText}>LOG IN</span>
          </button>
        </div>
        <div className={classes.linkContainer}>
          <p className={classes.linkText}>
            Don&apos;t have an account?&nbsp;
            <button type="button" className={classes.buttonLink} onClick={() => setShowModal(true)}>
              <span className={classes.link}>Create Account</span>
            </button>
          </p>
        </div>
        <div className={classes.passwordContainer}>
          <p className={classes.linkText}>
            Forgot password?&nbsp;
            <button type="button" className={classes.buttonLink}>
              <span className={classes.link}>Reset Password</span>
            </button>
          </p>
        </div>
      </form>
      {showModal && <RegistrationModal setShowModal={setShowModal} />}
    </div>
  );
};

export default LoginPage;
