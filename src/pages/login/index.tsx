import { useInjection } from 'inversify-react';
import LoginPageDumb, { LoginPageDumbProps } from './index.dumb';
import React, { Fragment } from 'react';
import { HttpClient } from '@quicker/common/http-client';
import { HttpClientSymbol } from '@domain/types/TYPES';
import { useNavigate } from 'react-router';
import ErrorPopup from '@components/popups/error-popup';
import { Helmet } from 'react-helmet';
import { useLoadingOverlayContext } from '@components/loading/loading-overlay/context';
import { useLoadingOverlay } from '@components/loading/loading-overlay/use-loading-overlay';
import { RouteNames } from '@quicker/routes';

export interface LoginPageProps {}

const LoginPage: React.FC<LoginPageProps> = (props) => {

  const [error, setError] = React.useState('');
  const client = useInjection<HttpClient>(HttpClientSymbol);
  const navigate = useNavigate();
  const [_,setLoading] = useLoadingOverlay();

  const onLogin = async (email: string, password: string) => {
    setLoading(true);
    client
      .login(email, password)
      .then(() => {
        setLoading(false);
        navigate(RouteNames.HOME);
      })
      .catch((err) => {
        setLoading(false);
        setError('Login failed');
      });
  };
  const onLoginWithApple = () => {};
  const onLoginWithGoogle = () => {};

  return (
    <Fragment>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <ErrorPopup message={error} setMessage={setError} />
      <LoginPageDumb
        {...props}
        onLogin={onLogin}
        onLoginWithApple={onLoginWithApple}
        onLoginWithGoogle={onLoginWithGoogle}
      />
    </Fragment>
  );
};

export default LoginPage;
