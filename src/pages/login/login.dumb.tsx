import React from 'react';
import style from './login.module.scss';
import CtaPrimary from '@components/buttons/cta-primary/cta-primary';
import { Link } from 'react-router-dom';
import { AiOutlineGoogle, AiFillApple } from 'react-icons/ai';
import TextInputFormFieldControlled from '@components/inputs/text-input-form-field-controlled';

export interface LoginPageDumbProps {
  onLogin: (username: string, password: string) => void;
  onForgotPassword?: () => void;
  onLoginWithGoogle?: () => void;
  onLoginWithApple?: () => void;
  emailValue: string;
  setEmailValue: (value: string) => void;
  passwordValue: string;
  setPasswordValue: (value: string) => void;
}

const text =
  'We understand that your furry friends deserve the best care, ' +
  "and we're here to provide it with our top-notch grooming and washing services.";

const LoginPageDumb: React.FC<LoginPageDumbProps> = ({
  onLoginWithApple,
  onLoginWithGoogle,
  emailValue,
  setEmailValue,
  passwordValue,
  setPasswordValue,
  onLogin,
}) => {

  const handleLogin = () => {
    onLogin(emailValue, passwordValue);
  }

  return (
    <div className={style.loginPage}>
      <div className={style.loginTitleWrapper}>
        <h1 className={style.loginTitle}>Login</h1>
      </div>
      <div className={style.loginPageInner}>
        <p className={style.loginPageInnerText}>{text}</p>
        <div className={style.loginInputWrapper}>
          <TextInputFormFieldControlled
            label="Email"
            value={emailValue}
            setValue={setEmailValue}
          />
          <TextInputFormFieldControlled
            value={passwordValue}
            setValue={setPasswordValue}
            label="Password"
            hidden={true}
            type={'password'}
          />
          <CtaPrimary
            content="Login"
            onClick={handleLogin}
          />
          <Link to={'/forgotpassword'} className={style.forgotPassBtn}>
            Forgot password
          </Link>
        </div>
        <div className={style.signupBtnWrapper}>
          <Link to="/signup" className={style.signupBtn}>
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPageDumb;
