import { trackPromise } from 'react-promise-tracker';
import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/Constants';

/**
 *
 * @name registerCustomer
 * @description Utilizes HttpHelper to make a post request to register a customer
 * @param {Object} customerData sets state for reservations
 * @param {Function} setApiError sets error if response is not 201 created
 * @returns boolean vlaue based on if a user was updated
 */
const registerCustomer = async (customerData, setApiError) => {
  let customerCreated = false;
  await trackPromise(
    HttpHelper(Constants.CUSTOMER_REGISTRATION_ENDPOINT, 'POST', customerData)
      .then((response) => {
        if (response.status === 201) {
          customerCreated = true;
          return;
        } if (response.status === 409) {
          setApiError(Constants.REGISTRATION_EMAIL_CONFLICT);
          return;
        }
        throw new Error();
      })
      .catch(() => setApiError(Constants.API_ERROR))
  );
  return customerCreated;
};

export default registerCustomer;
