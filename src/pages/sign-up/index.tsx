import React, { Fragment, useState } from 'react';
import SignUpPageDumb from './index.dumb';
import ErrorPopup from '@components/popups/error-popup';

export interface SignUpPageProps {}

const SignUpPage: React.FC<SignUpPageProps> = ({}) => {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [confirmPasswordValue, setConfirmPasswordValue] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const onSignUp = () => {
    if (passwordValue !== confirmPasswordValue) {
      setError('Passwords do not match');
      return;
    }
    ///TODO CALL API
    console.log(
      'TODO: onSignUp',
      emailValue,
      passwordValue,
      confirmPasswordValue,
      username,
    );
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
