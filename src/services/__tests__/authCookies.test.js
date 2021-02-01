import Router from 'next/router';
import Cookies from 'js-cookie';
import { AUTH_COOKIE_NAME } from '@configs/constants';
import { isLoggedIn, logIn, logOut } from '@services/authCookies';

jest.mock('next/router', () => ({ push: jest.fn() }));

beforeEach(() => {
  Object.keys(Cookies.get()).forEach((cookie) => {
    Cookies.remove(cookie);
  });
  Object.keys(Cookies.get()).forEach((cookie) => {
    Cookies.remove(cookie, {
      path: '',
    });
  });
});

describe('AuthCookie', () => {
  it('should confirm that user is not logged in', () => {
    expect(isLoggedIn()).toBeFalsy();
    expect(isLoggedIn(AUTH_COOKIE_NAME)).toBeFalsy();
  });

  it('should login user and push to home route', () => {
    logIn();

    expect(Router.push).toHaveBeenCalledWith('/');
  });

  it('should logout user and push to login route', () => {
    logOut();

    expect(Router.push).toHaveBeenCalledWith('/login');
  });
});
