import React from 'react';
import style from './index.module.scss';
import CtaPrimary from '@components/buttons/cta-primary/cta-primary';
import { Link } from 'react-router-dom';
import { AiOutlineGoogle, AiFillApple } from 'react-icons/ai';
import TextInputFormFieldControlled from '@components/inputs/text-input-form-field-controlled';
import '../../App.css';

export interface SignUpPageDumbProps {
  onSignUp: () => void;
  onSignUpWithGoogle?: () => void;
  onSignUpWithApple?: () => void;
  emailValue: string;
  setEmailValue: (value: string) => void;
  passwordValue: string;
  setPasswordValue: (value: string) => void;
  confirmPasswordValue: string;
  setConfirmPasswordValue: (value: string) => void;
  userNameValue: string;
  setUserNameValue: (value: string) => void;
}

const text =
  'We understand that your furry friends deserve the best care, ' +
  "and we're here to provide it with our top-notch grooming and washing services.";

const SignUpPageDumb: React.FC<SignUpPageDumbProps> = ({
  onSignUpWithApple,
  onSignUpWithGoogle,
  emailValue,
  setEmailValue,
  passwordValue,
  setPasswordValue,
  confirmPasswordValue,
  setConfirmPasswordValue,
  userNameValue,
  setUserNameValue,
  onSignUp,
}) => {
  return (
    <div className={style.signupPage}>
      <div className={style.signupTitleWrapper}>
        <h1 className={style.signupTitle}>Sign Up</h1>
      </div>
      <div className={style.signupPageInner}>
        <p className={style.signupPageInnerText}>{text}</p>
        <div className={style.signupInputWrapper}>
          <TextInputFormFieldControlled
            label="Email"
            value={emailValue}
            setValue={setEmailValue}
          />
          <TextInputFormFieldControlled
            label="Username"
            value={userNameValue}
            setValue={setUserNameValue}
          />
          <TextInputFormFieldControlled
            value={passwordValue}
            setValue={setPasswordValue}
            label="Password"
            hidden={true}
            type={'password'}
          />
          <TextInputFormFieldControlled
            value={confirmPasswordValue}
            setValue={setConfirmPasswordValue}
            label="Confirm Password"
            hidden={true}
            type={'password'}
          />
          <CtaPrimary
            content="Sign Up"
            onClick={() => {
              onSignUp();
            }}
          />
        </div>
        <div className={style.inputOptionsWrapper}>
          <div className={style.inputOption}>
            <AiOutlineGoogle
              size={'25px'}
              onClick={onSignUpWithGoogle}
              data-testid="google-icon"
            />
            <h2>Sign Up with Google</h2>
          </div>
          <div
            className={style.inputOption}
            onClick={onSignUpWithApple}
            data-testid="apple-icon"
          >
            <AiFillApple size={'25px'} />
            <h2>Sign Up with Apple</h2>
          </div>
        </div>
        <p
          className={style.signupPageInnerText}
          style={{ textAlign: 'center' }}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
          fugit maiores magni{' '}
        </p>
        <div className={style.signupBtnWrapper}>
          <Link to="/login" className={style.signupBtn}>
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPageDumb;
