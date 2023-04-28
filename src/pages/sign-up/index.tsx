import React, { Fragment, useState } from 'react';
import SignUpPageDumb from './index.dumb';
import ErrorPopup from '@components/popups/error-popup';
import { useInjection } from 'inversify-react';
import { CustomerSignupUseCase } from '@domain/usecases/customer/signup';
import { SignupRequest } from '@domain/types/requests/signup';
import { HttpClient } from '@quicker/common/http-client';
import { HttpClientSymbol } from '@domain/types/TYPES';
import { useNavigate } from 'react-router-dom';
import { useLoadingOverlay } from '@components/loading/loading-overlay/use-loading-overlay';
import { RouteNames } from '@quicker/routes';

export interface SignUpPageProps {}

const SignUpPage: React.FC<SignUpPageProps> = ({}) => {
  const [error, setError] = useState('');
  const signUp = useInjection<CustomerSignupUseCase>(CustomerSignupUseCase);
  const client = useInjection<HttpClient>(HttpClientSymbol);
  const navigate = useNavigate();
  const [_ ,setLoading] = useLoadingOverlay();

  const onSignUp = (email:string,password:string,first_name:string,last_name:string) => {
    const params = {
      email,
      password,
      first_name,
      last_name,
    } as SignupRequest;
    setLoading(true);

    signUp.call(params).then((res) => {
      const {token} = res;
      client.setAuthToken(token);
      setLoading(false);
      navigate(RouteNames.HOME);

    }).catch((err) => {
      if(err.response.status === 400){
        setError("User with same email exists");
      }else{
        setError("There is an issue happened 🤗");

      }
      setLoading(false);
    })
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
