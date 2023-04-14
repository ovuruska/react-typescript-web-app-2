import React, { Fragment, useState } from 'react';
import SignUpPageDumb from './index.dumb';
import ErrorPopup from '@components/popups/error-popup';
import { useInjection } from 'inversify-react';
import { CustomerSignupUseCase } from '@domain/usecases/customer/signup';
import { SignupRequest } from '@domain/types/requests/signup';
import { HttpClient } from '@quicker/common/http-client';
import { HttpClientSymbol } from '@domain/types/TYPES';

export interface SignUpPageProps {}

const SignUpPage: React.FC<SignUpPageProps> = ({}) => {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [confirmPasswordValue, setConfirmPasswordValue] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const signUp = useInjection<CustomerSignupUseCase>(CustomerSignupUseCase);
  const client = useInjection<HttpClient>(HttpClientSymbol);

  const onSignUp = () => {
    const params = {
      email: emailValue,
      password: passwordValue,
    } as SignupRequest;

    signUp.call(params).then((res) => {
      client.login(params.email, params.password);
    });
  };

  return (
    <Fragment>
      <ErrorPopup message={error} setMessage={setError} />
      <SignUpPageDumb
        emailValue={emailValue}
        setEmailValue={setEmailValue}
        passwordValue={passwordValue}
        setPasswordValue={setPasswordValue}
        confirmPasswordValue={confirmPasswordValue}
        setConfirmPasswordValue={setConfirmPasswordValue}
        userNameValue={username}
        setUserNameValue={setUsername}
        onSignUp={onSignUp}
      />
    </Fragment>
  );
};

export default SignUpPage;
