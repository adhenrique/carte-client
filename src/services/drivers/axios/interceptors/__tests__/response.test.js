import Router from 'next/router';
import axios from '../../index';

jest.mock('next/router', () => ({ push: jest.fn() }));

describe('Response Interceptor', () => {
  it('should fulfilled and rejected to be a object', () => {
    const fulfilledData = { data: 'foo' };
    const rejectedData = {
      response: {
        statusText: 'NotFound',
        status: 404,
        data: { message: 'Not authorized' },
      },
    };

    const fulfilled = axios.interceptors.response.handlers[0].fulfilled(
      fulfilledData,
    );
    expect(fulfilled).toBe(fulfilledData);

    const rejected = axios.interceptors.response.handlers[0].rejected(
      rejectedData,
    );
    expect(rejected).rejects.toMatchObject(rejectedData);
  });

  it('should throw 401 and redirect user to login', () => {
    const rejectedData = {
      response: {
        statusText: 'NotAuthorized',
        status: 401,
        data: { message: 'Not authorized' },
      },
    };

    const rejected = axios.interceptors.response.handlers[0].rejected(
      rejectedData,
    );
    expect(rejected).rejects.toMatchObject(rejectedData);
    expect(Router.push).toHaveBeenCalledWith('/login');
  });
});
