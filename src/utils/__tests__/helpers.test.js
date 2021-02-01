import Router from 'next/router';
import { redirectTo, getLangFromReq } from '../helpers';

jest.mock('next/router', () => ({ push: jest.fn() }));

describe('Helpers', () => {
  it('should redirect to /', () => {
    const url = '/';
    redirectTo(url);

    expect(Router.push).toHaveBeenCalledWith(url);
  });

  it('should redirect to login without slashes', () => {
    const url = 'login';
    redirectTo(url);

    Object.defineProperty(window, 'location', {
      value: url,
    });

    expect(window.location).toEqual(url);
  });

  it('should redirect to / with next writeHead', () => {
    const context = {
      res: {
        writeHead: jest.fn(),
        end: jest.fn(),
      },
    };

    const url = '/';
    redirectTo(url, context);

    expect(context.res.writeHead).toHaveBeenCalledWith(302, { Location: url });
    expect(context.res.end).toHaveBeenCalled();
  });

  it('should return a language', () => {
    const req = {
      headers: {
        'accept-language': 'en, pt-BR',
      },
    };

    expect(getLangFromReq(req)).toBe('en');
    expect(getLangFromReq()).toBe('en');
  });
});
