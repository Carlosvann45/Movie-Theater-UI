const DeleteCookie = () => {
  document.cookie = 'customer={}; tokens={} expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
};

export default DeleteCookie;
