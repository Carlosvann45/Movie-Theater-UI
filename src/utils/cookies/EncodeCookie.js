import DecodeCookie from './DecodeCookie';
import DeleteCookie from './DeleteCookie';

const EncodeCookie = (
  {
    customer, tokens, getTokens = false, getCustomer = false
  }
) => {
  let cookie = '';

  if (customer) cookie += `customer=${JSON.stringify(customer)}; `;
  else if (getCustomer) {
    const currentCookie = DecodeCookie();

    cookie += `customer=${JSON.stringify(currentCookie.customer)}; `;
  }

  if (tokens && !getTokens) cookie += `tokens=${JSON.stringify(tokens)}; `;
  else if (getTokens) {
    const currentCookie = DecodeCookie();

    cookie += `customer=${JSON.stringify(currentCookie.tokens)}; `;
  }

  DeleteCookie();

  document.cookie = cookie;
};

export default EncodeCookie;
