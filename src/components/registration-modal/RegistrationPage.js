import React, { useEffect, useRef, useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import classes from './RegistrationPage.module.css';
import CustomerValidation from './CustomerValidation';
import registerCustomer from './RegistrationPageService';

/**
 * @name RegistrationModal
 * @description Displays a modal for a user to create a account
 */
const RegistrationModal = ({ setShowModal }) => {
  const ref = useRef();
  const ref2 = useRef();
  const sessionCustomer = sessionStorage.getItem('customerData');
  const defaultCustomer = { recieveTextPromotions: false, recieveEmailPromotions: false };
  const findCustomer = sessionCustomer ? JSON.parse(sessionCustomer) : defaultCustomer;
  const [visable, setVisable] = useState(true);
  const [visable2, setVisable2] = useState(true);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [customerData, setCustomerData] = useState(findCustomer);

  /**
   * @name handleClose
   * @description handles creating a draft of the current customer data before
   * closing the modal
   */
  const handleClose = () => {
    const dataToSave = {
      firstName: customerData.firstName,
      lastName: customerData.lastName,
      email: customerData.email,
      phoneNumber: customerData.phoneNumber,
      recieveTextPromotions: customerData.recieveTextPromotions,
      recieveEmailPromotions: customerData.recieveEmailPromotions
    };
    sessionStorage.setItem('customerData', JSON.stringify(dataToSave));
    setShowModal(false);
  };

  /**
   * @name handleSubmit
   * @description submits customer if no errors otherwise will display errors from validation
   * @param {Event} e event used to prevent page from refreshing
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = CustomerValidation(customerData);

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      const newCustomer = {
        firstName: customerData.firstName,
        lastName: customerData.lastName,
        email: customerData.email,
        password: customerData.password,
        phoneNumber: customerData.phoneNumber,
        recieveTextPromotions: Boolean(customerData.recieveTextPromotions),
        recieveEmailPromotions: Boolean(customerData.recieveEmailPromotions)
      };
      const customerCreated = await registerCustomer(newCustomer, setApiError);

      if (customerCreated) {
        sessionStorage.removeItem('customerData');
        setShowModal(false);
      } else {
        document.getElementById('modalBackground').scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    }
  };

  /**
   * @name handleOnchange
   * @description targets values of inputs to create a user object
   * @param {Event} e event to target and grab values from
   */
  const handleOnchange = (e) => {
    setCustomerData({ ...customerData, [e.target.name]: e.target.value });
  };

  /**
   * @name handleOnchangeCheck
   * @description targets values of inputs to create a user object
   * @param {Event} e event to target and grab values from
   */
  const handleOnchangeCheck = (e) => {
    setCustomerData({ ...customerData, [e.target.name]: e.target.checked });
  };

  /**
   * @name phoneNumberOnChange
   * @description targets values of inputs to create a auto generate phone number
   * based from user inputs
   * @param {Event} e event to target and grab values from
   */
  const phoneNumberOnChange = (e) => {
    const { name, value } = e.target;
    const { length } = value;

    if (value.length <= 14) {
      let formattedNumber;
      // Filter non numbers
      const regex = () => value.replace(/[^0-9.]+/g, '');
      // Set area code with parenthesis around it
      const areaCode = () => `(${regex().slice(0, 3)})`;

      // Set formatting for first six digits
      const firstSix = () => `${areaCode()} ${regex().slice(3, 6)}`;

      // Dynamic trail as user types
      const trailer = (start) => `${regex().slice(start,
        regex().length)}`;
      if (length < 3) {
      // First 3 digits
        formattedNumber = regex();
      } else if (length === 4) {
      // After area code
        formattedNumber = `${areaCode()} ${trailer(3)}`;
      } else if (length === 5) {
      // When deleting digits inside parenthesis
        formattedNumber = `${areaCode().replace(')', '')}`;
      } else if (length > 5 && length < 9) {
      // Before dash
        formattedNumber = `${areaCode()} ${trailer(3)}`;
      } else if (length >= 10) {
      // After dash
        formattedNumber = `${firstSix()}-${trailer(6)}`;
      }

      setCustomerData({ ...customerData, [name]: formattedNumber });
    } else {
      setCustomerData({ ...customerData });
    }
  };

  /**
   * @name useOnClickOutside
   * @description Listens for click outside compnent and closes menu
   * @param {} trackRef referance object
   * @param {*} handler action to call
   */
  const useOnClickOutside = (trackRef, handler) => {
    useEffect(
      () => {
        const listener = (event) => {
          if (!ref.current || ref.current.contains(event.target)) {
            return;
          }
          handler(event);
        };
        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);
        return () => {
          document.removeEventListener('mousedown', listener);
          document.removeEventListener('touchstart', listener);
        };
      },
      [trackRef, handler]
    );
  };

  useOnClickOutside(ref, () => handleClose());

  return (
    <div id="modalBackground" className={classes.modalBackground} ref={ref2}>
      <div className={classes.modalContainer}>
        <form
          className={classes.modal}
          ref={ref}
          onSubmit={handleSubmit}
        >
          <div className={classes.closeContainer}>
            <button type="button" className={classes.close} onClick={() => handleClose()}>X</button>
          </div>
          <h4
            className={apiError ? classes.titleError : classes.title}
          >
            Register for a MTE account!
          </h4>
          {apiError && <p className={classes.apiError}>{apiError}</p>}
          <div className={errors.firstName ? classes.errorField : classes.loginField} aria-label="Enter first name">
            <label htmlFor="firstName">
              <p id="firstName" className={classes.label}>First Name &#42;</p>
              <input
                name="firstName"
                type="text"
                aria-labelledby="firstName"
                autoComplete="given-name"
                className={classes.input}
                onChange={handleOnchange}
                value={customerData.firstName}
              />
              {errors.firstName && <p className={classes.errorText}>{errors.firstName}</p>}
            </label>
          </div>
          <div className={errors.lastName ? classes.errorField : classes.loginField} aria-label="Enter last name">
            <label htmlFor="lastName">
              <p id="lastName" className={classes.label}>Last Name &#42;</p>
              <input
                name="lastName"
                type="text"
                aria-labelledby="lastName"
                autoComplete="family-name"
                className={classes.input}
                onChange={handleOnchange}
                value={customerData.lastName}
              />
              {errors.lastName && <p className={classes.errorText}>{errors.lastName}</p>}
            </label>
          </div>
          <div className={errors.email ? classes.errorField : classes.loginField} aria-label="Enter email address">
            <label htmlFor="email">
              <p id="email" className={classes.label}>Email Address &#42;</p>
              <input
                name="email"
                type="text"
                aria-labelledby="email"
                placeholder="example@example.com"
                autoComplete="email"
                className={classes.input}
                onChange={handleOnchange}
                value={customerData.email}
              />
              {errors.email && <p className={classes.errorText}>{errors.email}</p>}
            </label>
          </div>
          <div className={errors.emailConfirm ? classes.errorField : classes.loginField} aria-label="Confirm email address">
            <label htmlFor="emailConfirm">
              <p id="emailConfirm" className={classes.label}>Confirm Email Address &#42;</p>
              <input
                name="emailConfirm"
                type="text"
                aria-labelledby="emailConfirm"
                placeholder="example@example.com"
                autoComplete="email"
                className={classes.input}
                onChange={handleOnchange}
                value={customerData.emailConfirm}
              />
              {errors.emailConfirm && <p className={classes.errorText}>{errors.emailConfirm}</p>}
            </label>
          </div>
          <div className={errors.password ? classes.errorField : classes.loginField} aria-label=" Enter password">
            <label htmlFor="password">
              <p id="password" className={classes.label}>Password &#42;</p>
              <div className={classes.passwordInput}>
                <input
                  name="password"
                  type={visable ? 'password' : 'text'}
                  aria-labelledby="password"
                  autoComplete="new-password"
                  className={classes.input}
                  onChange={handleOnchange}
                />
                <button type="button" className={classes.passwordIcon} onClick={() => setVisable(!visable)}>
                  {visable ? <VisibilityIcon style={{ color: 'grey' }} /> : <VisibilityOffIcon style={{ color: 'grey' }} />}
                </button>
              </div>
              {errors.password && <p className={classes.errorText}>{errors.password}</p>}
            </label>
          </div>
          <div className={errors.confirmPassword ? classes.errorField : classes.loginField} aria-label=" Enter password">
            <label htmlFor="confirmPassword">
              <p id="confirmPassword" className={classes.label}>Confirm Password &#42;</p>
              <div className={classes.passwordInput}>
                <input
                  name="confirmPassword"
                  type={visable2 ? 'password' : 'text'}
                  aria-labelledby="confirmPassword"
                  autoComplete="new-password"
                  className={classes.input}
                  onChange={handleOnchange}
                />
                <button type="button" className={classes.passwordIcon} onClick={() => setVisable2(!visable2)}>
                  {visable2 ? <VisibilityIcon style={{ color: 'grey' }} /> : <VisibilityOffIcon style={{ color: 'grey' }} />}
                </button>
              </div>
              {errors.confirmPassword && (
              <p className={classes.errorText}>{errors.confirmPassword}</p>)}
            </label>
          </div>
          <div className={errors.phoneNumber ? classes.errorField : classes.loginField} aria-label=" Enter phone number">
            <label htmlFor="phoneNumber">
              <p id="phoneNumber" className={classes.label}>Phone Number &#42;</p>
              <input
                name="phoneNumber"
                type="tel"
                aria-labelledby="phoneNumber"
                placeholder="(123) 123-1234"
                autoComplete="tel"
                className={classes.input}
                onChange={phoneNumberOnChange}
                value={customerData.phoneNumber}
              />
              {errors.phoneNumber && (
              <p className={classes.errorText}>{errors.phoneNumber}</p>)}
            </label>
          </div>
          <div className={classes.checkFieldContainer}>
            <div className={classes.checkboxField} arial-label="Check box for sms promotions">
              <label htmlFor="recieveTextPromotions" className={classes.checkboxContainer}>
                <input
                  type="checkbox"
                  name="recieveTextPromotions"
                  aria-labelledby="recieveTextPromotions"
                  className={classes.checkbox}
                  onChange={handleOnchangeCheck}
                  checked={customerData.recieveTextPromotions}
                />
                <p id="recieveTextPromotions" className={classes.checkboxText}>Receive SMS promotions &#38; alerts</p>
              </label>
            </div>
            <div className={classes.checkboxField} arial-label="Check box for text promotions">
              <label htmlFor="recieveEmailPromotions" className={classes.checkboxContainer}>
                <input
                  type="checkbox"
                  name="recieveEmailPromotions"
                  aria-labelledby="recieveEmailPromotions"
                  className={classes.checkbox}
                  onChange={handleOnchangeCheck}
                  checked={customerData.recieveEmailPromotions}
                />
                <p id="recieveEmailPromotions" className={classes.checkboxText}>Receive email promotions &#38; alerts</p>
              </label>
            </div>
          </div>
          <div className={classes.buttonContainer}>
            <button type="submit" className={classes.registerButton}>
              <span className={classes.buttonText}>Register</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationModal;
