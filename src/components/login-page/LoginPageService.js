import { trackPromise } from 'react-promise-tracker';
import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/Constants';

/**
 *@name getCustomerInfo
 *@description gets customer information from api
 * @param {String} email email to retrive customer information
 * @param {Object} customerAuth customer auth context
 * @param {Function} setCustomerAuth usestate for setting customer info
 * @returns boolean value for
 */
export const getCustomerInfo = async (email, customerAuth, setCustomerAuth, setApiError) => {
  let customerFetched = false;

  await trackPromise(
    HttpHelper(`${Constants.CUSTOMERS_ENDPOINT}/${email}`, 'GET')
      .then((response) => {
        if (response.status === 200) {
          customerFetched = true;
          return response.json();
        } if (response.status === 401) {
          setApiError(Constants.UNAUTHORIZED);
          return response.json();
        }

        throw new Error();
      })
      .then((customer) => {
        if (customerFetched) {
          setCustomerAuth({ ...customerAuth, customer: { ...customer } });
        }
      })
      .catch(() => setApiError(Constants.API_ERROR))
  );

  return customerFetched;
};

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
    HttpHelper(Constants.CUSTOMER_LOG_IN_ENDPOINT, 'POST', signInCreds)
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
      .then(async (tokens) => {
        if (customerLoggedIn) {
          sessionStorage.setItem('accessToken', tokens.accessToken);
          sessionStorage.setItem('refresherToken', tokens.refresherToken);

          setCustomerAuth({ ...tokens });
        }
      })
      .catch(() => setApiError(Constants.API_ERROR))
  );

  return customerLoggedIn;
};

export default logInCustomer;
