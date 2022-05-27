import Constants from '../../utils/Constants';

const CustomerValidation = (customerData) => {
  const errors = {};

  if (!customerData.firstName) {
    errors.firstName = 'First name is a required field.';
  } else if (!Constants.NAME_REGEX.test(customerData.firstName)) {
    errors.firstName = 'First name can not contain special characters.';
  }

  if (!customerData.lastName) {
    errors.lastName = 'Last name is a required field.';
  } else if (!Constants.NAME_REGEX.test(customerData.lastName)) {
    errors.lastName = 'Last name can not contain special characters.';
  }

  if (!customerData.email) {
    errors.email = 'Email is a required field.';
  } else if (!Constants.EMAIL_REGEX.test(customerData.email)) {
    errors.email = 'Email must match format example123@example.com.';
  }

  if (!customerData.emailConfirm) {
    errors.emailConfirm = 'You must confirm email address.';
  } else if (customerData.email !== customerData.emailConfirm) {
    errors.emailConfirm = 'Emails must match.';
  }

  if (!customerData.password) {
    errors.password = 'Password is a required field.';
  } else if (customerData.password.length < 8) {
    errors.password = 'Password must have a length greater than 8 characters.';
  } else if (customerData.confirmPassword.length < 8) {
    errors.confirmPassword = 'Password must have a length greater than 8 characters.';
  }

  if (!customerData.confirmPassword) {
    errors.confirmPassword = 'You must confirm password.';
  } else if (customerData.password !== customerData.confirmPassword) {
    errors.confirmPassword = 'Passwords must match.';
  }

  if (!customerData.phoneNumber) {
    errors.phoneNumber = 'Phone number is required field.';
  } else if (customerData.phoneNumber.length < 14) {
    errors.phoneNumber = 'Phone number must match format (123) 123-1234';
  }

  return errors;
};

export default CustomerValidation;
