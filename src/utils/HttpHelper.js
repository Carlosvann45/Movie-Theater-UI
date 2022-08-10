import Constants from './Constants';
import DecodeCookie from './cookies/DecodeCookie';

const GetToken = () => {
  const cookie = DecodeCookie();
  const useRefresher = sessionStorage.getItem("useAccessToken");

  if (useRefresher != null && useRefresher === ' true') {
	
  }

  return cookie?.tokens?.accessToken;
};

/**
 * @name HttpHelper
 * @description - Utility method for using fetch in a convenient manner
 * @param {string} route address to ping
 * @param {string} method http method
 * @param {Object} payload object to send
 * @return {Promise} - Promise from the fetch call
 */
export default (route, method, payload) => fetch(Constants.BASE_URL_API + route, {
  method,
  headers: {
    Authorization: `Bearer ${GetToken()}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(payload)
});
