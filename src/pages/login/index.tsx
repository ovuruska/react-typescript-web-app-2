import { useInjection } from 'inversify-react';
import LoginPageDumb, { LoginPageDumbProps } from './index.dumb';
import React, { Fragment } from 'react';
import { HttpClient } from '@quicker/common/http-client';
import { HttpClientSymbol } from '@domain/types/TYPES';
import { useNavigate } from 'react-router';
import ErrorPopup from '@components/popups/error-popup';

export interface LoginPageProps {}

const LoginPage: React.FC<LoginPageProps> = (props) => {

  const [error, setError] = React.useState('');
  const client = useInjection<HttpClient>(HttpClientSymbol);
  const navigate = useNavigate();

  const onLogin = async (email: string, password: string) => {
    client
      .login(email, password)
      .then(() => {
        navigate('/');
      })
      .catch((err) => {
        setError('Login failed');
      });
  };
  const onLoginWithApple = () => {};
  const onLoginWithGoogle = () => {};

  return (
    <Fragment>
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
