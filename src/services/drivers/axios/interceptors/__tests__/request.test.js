import axios from '../../index';

describe('Request Interceptor', () => {
  it('should fulfilled and rejected to be a object',() => {
    const fulfilledData = { data: 'foo' };
    const rejectedData = {
      response: {
        statusText: 'NotFound',
        status: 404,
        data: { message: 'Page not found' },
      },
    };

    const fulfilled = axios.interceptors.request.handlers[0].fulfilled(
      fulfilledData,
    );
    const rejected = axios.interceptors.request.handlers[0].rejected(
      rejectedData,
    );
    expect(fulfilled).toBe(fulfilledData);
    expect(rejected).rejects.toMatchObject(rejectedData);
  });
});
