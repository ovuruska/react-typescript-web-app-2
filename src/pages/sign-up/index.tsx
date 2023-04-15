import React, { Fragment, useState } from 'react';
import SignUpPageDumb from './index.dumb';
import ErrorPopup from '@components/popups/error-popup';
import { useInjection } from 'inversify-react';
import { CustomerSignupUseCase } from '@domain/usecases/customer/signup';
import { SignupRequest } from '@domain/types/requests/signup';
import { HttpClient } from '@quicker/common/http-client';
import { HttpClientSymbol } from '@domain/types/TYPES';
import { useNavigate } from 'react-router-dom';

export interface SignUpPageProps {}

const SignUpPage: React.FC<SignUpPageProps> = ({}) => {
  const [error, setError] = useState('');
  const signUp = useInjection<CustomerSignupUseCase>(CustomerSignupUseCase);
  const client = useInjection<HttpClient>(HttpClientSymbol);
  const navigate = useNavigate();
  const onSignUp = (email:string,password:string,first_name:string,last_name:string) => {
    const params = {
      email,
      password,
      first_name,
      last_name,
    } as SignupRequest;

    signUp.call(params).then((res) => {
      client.login(params.email, params.password).then(() => {
        navigate('/');
      });
    }).catch((err) => {
      if(err.response.status === 400){
        setError("Email already exists");
      }
      setError("There is an issue happened 🤗");
    });
  };

  return (
    <Fragment>
      <ErrorPopup message={error} setMessage={setError} />
      <SignUpPageDumb
        onSignUp={onSignUp}
      />
    </Fragment>
  );
};

export default SignUpPage;
