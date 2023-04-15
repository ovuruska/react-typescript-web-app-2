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
  firstName: string;
  setFirstName: (value: string) => void;
  lastName: string;
  setLastName: (value: string) => void;
}

const text =
  'We understand that your furry friends deserve the best care, ' +
  "and we're here to provide it with our top-notch grooming and washing services.";

const SignUpPageDumb: React.FC<SignUpPageDumbProps> = ({
  emailValue,
  setEmailValue,
  passwordValue,
  setPasswordValue,
  confirmPasswordValue,
  setConfirmPasswordValue,
  firstName,
  setFirstName,
  lastName,
  setLastName,
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
            label="First name"
            value={firstName}
            setValue={setFirstName}
          />
          <TextInputFormFieldControlled
            label={'Last name'}
            value={lastName}
            setValue={setLastName}
            />
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
          <TextInputFormFieldControlled
            value={confirmPasswordValue}
            setValue={setConfirmPasswordValue}
            label="Confirm password"
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
