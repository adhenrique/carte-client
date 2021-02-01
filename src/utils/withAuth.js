import { isLoggedIn } from '@services/authCookies';
import { redirectTo } from '@utils/helpers';

export default function withAuth(Component) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  const AuthComponent = (props) => <Component {...props} />;

  AuthComponent.getInitialProps = (context) => {
    const isUserLoggedIn = isLoggedIn(context?.req?.headers?.cookie || '');

    if (!isUserLoggedIn) {
      redirectTo('/login', context);
    }

    return { user: { isLoggedIn: isUserLoggedIn } };
  };

  return AuthComponent;
}
