import React, { useState } from 'react';
import style from './login.module.scss';
import TextInputFormField from '@components/inputs/text-input-form-field/text-input-form-field';

export interface LoginPageDumbProps {
  onLogin: (username: string, password: string) => void;
  onForgotPassword: () => void;
  onLoginWithGoogle: () => void;
  onLoginWithApple: () => void;
}

const text =
  'We understand that your furry friends deserve the best care, ' +
  "and we're here to provide it with our top-notch grooming and washing services.";

const LoginPageDumb: React.FC<LoginPageDumbProps> = () => {
  const [value, setValue] = React.useState('');
  const [focusedMail, setFocusedMail] = React.useState(false);

  const handleFocus = (isFocused: boolean) => {
    setFocusedMail(isFocused);
  };
  return (
    <div className={style.loginPage}>
      <div className={style.loginTitleWrapper}>
        <h1 className={style.loginTitle}>Login</h1>
      </div>
      <div className={style.loginPageInner}>
        <p className={style.loginPageInnerText}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
          fugit maiores magni{' '}
        </p>
        <div className={style.loginInputWrapper}>
          <TextInputFormField label="Email" />
          <TextInputFormField
            label="Password"
            hidden={true}
            type={'password'}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPageDumb;
