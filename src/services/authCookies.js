import router from 'next/router';
import Cookies from 'js-cookie';
import cookie from 'cookie';
import { AUTH_COOKIE_NAME } from '@configs/constants';

export const isLoggedIn = (reqCookies = null) => {
  // if we don't have request cookies, get the cookie from client
  if (!reqCookies) {
    return !!Cookies.get(AUTH_COOKIE_NAME);
  }

  // otherwise get cookie from server
  return !!cookie.parse(reqCookies)[AUTH_COOKIE_NAME];
};

export const logIn = () => {
  Cookies.set(AUTH_COOKIE_NAME, true, {
    expires: 86400,
    sameSite: 'lax',
  });

  router.push('/');
};

export const logOut = () => {
  // remove logged in user's cookie and redirect to login page
  Cookies.remove(AUTH_COOKIE_NAME, {
    expires: 86400,
    sameSite: 'lax',
  });

  router.push('/login');
};
