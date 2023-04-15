import { useInjection } from 'inversify-react';
import LoginPageDumb, { LoginPageDumbProps } from './login.dumb';
import React, { Fragment } from 'react';
import { HttpClient } from '@quicker/common/http-client';
import { HttpClientSymbol } from '@domain/types/TYPES';
import { useNavigate } from 'react-router';
import ErrorPopup from '@components/popups/error-popup';

export interface LoginPageProps {}

const validateEmail = (email: string) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}


interface ValidationResult {
  valid: boolean;
  errorMessage?: string;
}

const passwordValidator = (password: string): ValidationResult => {
  // Minimum length: 8 characters
  const minLength = 8;

  // At least one uppercase, one lowercase, one number, and one special character
  const uppercaseRegex = /[A-Z]/;
  const lowercaseRegex = /[a-z]/;
  const numberRegex = /[0-9]/;
  const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

  if (password.length < minLength) {
    return {
      valid: false,
      errorMessage: `Password must be at least ${minLength} characters long.`,
    };
  }

  if (!uppercaseRegex.test(password)) {
    return {
      valid: false,
      errorMessage: 'Password must contain at least one uppercase letter.',
    };
  }

  if (!lowercaseRegex.test(password)) {
    return {
      valid: false,
      errorMessage: 'Password must contain at least one lowercase letter.',
    };
  }

  if (!numberRegex.test(password)) {
    return {
      valid: false,
      errorMessage: 'Password must contain at least one number.',
    };
  }

  if (!specialCharRegex.test(password)) {
    return {
      valid: false,
      errorMessage: 'Password must contain at least one special character.',
    };
  }

  return { valid: true };
};

// Usage example
const password = 'MyPassword123!';
const validationResult = passwordValidator(password);

if (!validationResult.valid) {
  console.log(validationResult.errorMessage);
} else {
  console.log('Password is valid.');
}


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
