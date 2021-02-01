import * as axios from 'axios';
import Service from '../base';

// fixme - repeated code
jest.mock('axios');

const mockDelay = 1;
let mockError;
let mockResponse = {
  data: {},
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
};

function req() {
  return new Promise((resolve, reject) => {
    axios.delayTimer = setTimeout(() => {
      if (mockError) {
        reject(mockError);
      } else {
        resolve(mockResponse);
      }
    }, mockDelay);
  });
}

function setMockResponse(response = {}) {
  mockResponse = response;
}

axios.get.mockImplementation(req);
axios.post.mockImplementation(req);
axios.put.mockImplementation(req);
axios.delete.mockImplementation(req);

afterEach(() => {
  axios.get.mockClear();
  axios.post.mockClear();
  axios.put.mockClear();
  axios.delete.mockClear();
});

describe('Service', () => {
  it('should call a GET in API', async () => {
    const thenFn = jest.fn();
    const catchFn = jest.fn();

    await Service('resource').get(1, {}).then(thenFn).catch(catchFn);

    await expect(axios.get).toHaveBeenCalledWith('resource/1', {});
    await expect(thenFn).toHaveBeenCalledWith(mockResponse);
    await expect(catchFn).not.toHaveBeenCalled();
  });

  it('should call a GET all in API', async () => {
    const thenFn = jest.fn();
    const catchFn = jest.fn();

    await Service('resource').list('', {}).then(thenFn).catch(catchFn);

    await expect(axios.get).toHaveBeenCalledWith('resource', {});
    await expect(thenFn).toHaveBeenCalledWith(mockResponse);
    await expect(catchFn).not.toHaveBeenCalled();
  });

  it('should call a POST in API', async () => {
    const data = { a: 1, b: 2 };
    setMockResponse({
      data,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    });
    const thenFn = jest.fn();
    const catchFn = jest.fn();

    await Service('resource').store('', data, {}).then(thenFn).catch(catchFn);

    await expect(axios.post).toHaveBeenCalledWith('resource', data, {});
    await expect(thenFn).toHaveBeenCalledWith(mockResponse);
    await expect(catchFn).not.toHaveBeenCalled();
  });

  it('should call a PUT in API', async () => {
    const data = { a: 1, b: 2 };
    setMockResponse({
      data,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    });
    const thenFn = jest.fn();
    const catchFn = jest.fn();

    await Service('resource').update(1, data, {}).then(thenFn).catch(catchFn);

    await expect(axios.put).toHaveBeenCalledWith('resource/1', data, {});
    await expect(thenFn).toHaveBeenCalledWith(mockResponse);
    await expect(catchFn).not.toHaveBeenCalled();
  });

  it('should call a DELETE in API', async () => {
    const data = { a: 1, b: 2 };
    setMockResponse({
      data,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    });
    const thenFn = jest.fn();
    const catchFn = jest.fn();

    await Service('resource').destroy(1, {}).then(thenFn).catch(catchFn);

    await expect(axios.delete).toHaveBeenCalledWith('resource/1', {});
    await expect(thenFn).toHaveBeenCalledWith(mockResponse);
    await expect(catchFn).not.toHaveBeenCalled();
  });

  it('should fetches erroneously data from an API', async () => {
    const errorMessage = 'Network Error';

    axios.get.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage)),
    );

    await expect(Service().get('react')).rejects.toThrow(errorMessage);
  });
});
