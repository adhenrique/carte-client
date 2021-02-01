import Router from 'next/router';

export const redirectTo = (destination, { res, status } = {}) => {
  if (res) {
    res.writeHead(status || 302, { Location: destination });
    res.end();
  } else if (destination[0] === '/' && destination[1] !== '/') {
    Router.push(destination);
  } else {
    window.location = destination;
  }
};

export const getLangFromReq = (req = {}) => {
  const headers = req.headers || {};
  const acceptLanguage = headers['accept-language'];
  return acceptLanguage && acceptLanguage.length > 0
    ? acceptLanguage.split(',')[0]
    : 'en';
};
