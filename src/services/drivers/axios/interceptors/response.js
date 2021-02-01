import { logOut } from '@services/authCookies';

const resSuccess = (res) => res;
const resError = (err) => {
  if (err.response?.status === 401) {
    logOut();

    return Promise.reject(err);
  }
  return Promise.reject(err);
};

export { resSuccess, resError };
