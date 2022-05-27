import { trackPromise } from 'react-promise-tracker';
import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/Constants';

/**
 *
 * @name logInCustomer
 * @description Utilizes HttpHelper to make a post request to register a customer
 * @param {Object} customerData sets state for reservations
 * @param {Function} setApiError sets error if response is not 201 created
 * @returns boolean vlaue based on if a user was updated
 */
const logInCustomer = async (signInCreds, setCustomerAuth, setApiError) => {
  let customerLoggedIn = false;
  await trackPromise(
    HttpHelper(`${Constants.CUSTOMER_LOG_IN_ENDPOINT}?email=${signInCreds.email}&password=${signInCreds.password}`, 'GET')
      .then((response) => {
        if (response.status === 200) {
          customerLoggedIn = true;
          return response.json();
        } if (response.status === 401) {
          setApiError(Constants.LOG_IN_UNAUTHORIZED);
          return response.json();
        } if (response.status === 404) {
          setApiError(Constants.LOG_IN_UNAUTHORIZED);
          return response.json();
        }
        throw new Error();
      })
      .then((response) => {
        // TODO: add role based functionality and such later
        if (customerLoggedIn) {
          setCustomerAuth({
            user: response.user,
            token: response.token
          });
        }
      })
      .catch(() => setApiError(Constants.API_ERROR))
  );
  return customerLoggedIn;
};

export default logInCustomer;
