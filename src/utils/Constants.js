/**
 * Constants to be used in application
 */
module.exports = Object.freeze({
  // Errors
  API_ERROR: 'The system is currently unavilable.',
  REGISTRATION_EMAIL_CONFLICT: 'Email is already in use.',
  LOG_IN_UNAUTHORIZED: 'Email Address or Password was incorrect.',
  UNAUTHORIZED: 'You are not authorized to access this page.',
  // Routes
  BASE_URL_API: 'http://localhost:8085',
  CUSTOMERS_ENDPOINT: '/customers',
  CUSTOMER_REGISTRATION_ENDPOINT: '/customers/register',
  CUSTOMER_LOG_IN_ENDPOINT: '/customers/login',
  // Regex
  NAME_REGEX: /^[a-z ,.'-]+$/i,
  EMAIL_REGEX: /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/i
});
