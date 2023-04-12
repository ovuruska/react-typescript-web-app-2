import { useInjection } from 'inversify-react';
import LoginPageDumb, { LoginPageDumbProps } from './login.dumb';
import React from 'react';
import { HttpClient } from '@quicker/common/http-client';
import { HttpClientSymbol } from '@domain/types/TYPES';
import { useNavigate } from 'react-router';

export interface LoginPageProps {}

const LoginPage: React.FC<LoginPageProps> = (props) => {
  const [emailValue, setEmailValue] = React.useState('');
  const [passwordValue, setPasswordValue] = React.useState('');
  const client = useInjection<HttpClient>(HttpClientSymbol);
  const navigate = useNavigate();

  const onLogin = async (username: string, password: string) => {
    client
      .login(username, password)
      .then(() => {
        console.log('in then');
        navigate('/');
      })
      .catch(() => {
        console.log('Login failed');
        alert('Login failed || TODO better failure handling');
      });
  };
  const onLoginWithApple = () => {};
  const onLoginWithGoogle = () => {};

  return (
    <LoginPageDumb
      {...props}
      emailValue={emailValue}
      setEmailValue={setEmailValue}
      passwordValue={passwordValue}
      setPasswordValue={setPasswordValue}
      onLogin={onLogin}
      onLoginWithApple={onLoginWithApple}
      onLoginWithGoogle={onLoginWithGoogle}
    />
  );
};

export default LoginPage;
