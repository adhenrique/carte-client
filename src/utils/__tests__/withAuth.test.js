import { render } from '@testing-library/react';
import Cookies from 'js-cookie';
import withAuth from '@utils/withAuth';
import { AUTH_COOKIE_NAME } from '@configs/constants';

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

describe('With Auth', () => {
  it('should redirect to /login, since the user is not logged', () => {
    const TestPage = () => <div>Test page</div>;
    const WithAuthComponent = withAuth(<TestPage />);

    const context = {
      res: {
        writeHead: jest.fn(),
        end: jest.fn(),
      },
    };

    WithAuthComponent.getInitialProps(context);

    expect(context.res.writeHead).toHaveBeenCalledWith(302, {
      Location: '/login',
    });
    expect(context.res.end).toHaveBeenCalled();
  });

  it('should return object, since the user is logged', () => {
    const TestPage = () => <div>Test page</div>;
    Cookies.set(AUTH_COOKIE_NAME, true);
    const WithAuthComponent = withAuth(<TestPage />);

    expect(WithAuthComponent.getInitialProps()).toEqual({
      user: { isLoggedIn: true },
    });
  });

  it('should pass props to HOC', () => {
    const mockComponent = jest.fn(() => null);
    const Component = withAuth(mockComponent);
    const props = {
      someProp: 'propValue',
    };

    // eslint-disable-next-line react/jsx-props-no-spreading
    render(<Component {...props} />);

    expect(mockComponent).toBeCalled();
    expect(mockComponent).toBeCalledWith(props, expect.anything());
  });
});
