const DecodeCookie = () => {
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArr = decodedCookie.split(' ');
  let response = {};
  let userStr;
  let tokenStr;

  cookieArr.forEach((cookieStr) => {
    let i;
    let j;

    if (cookieStr.startsWith('customer=')) {
      i = cookieStr.indexOf('{');
      j = cookieStr.lastIndexOf('}');
      userStr = cookieStr.substring(i, j);
    } else if (cookieStr.startsWith('tokens=')) {
      i = cookieStr.indexOf('{');
      j = cookieStr.lastIndexOf('}');
      tokenStr = cookieStr.substring(i, j);
    }
  });

  if (userStr) response = { ...response, customer: JSON.parse(userStr) };
  if (tokenStr) response = { ...response, tokens: JSON.parse(tokenStr) };

  return response;
};

export default DecodeCookie;
