import React, { ReactNode } from 'react';
import { render, fireEvent, screen, getByTestId } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SignUpPageDumb, { SignUpPageDumbProps } from './index.dumb';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Link: ({ children, to }: { children: ReactNode; to: string }) => (
    <a href={to}>{children}</a>
  ),
}));

describe('SignUpPageDumb', () => {
  const defaultProps: SignUpPageDumbProps = {
    onSignUp: jest.fn(),
    onSignUpWithGoogle: jest.fn(),
    onSignUpWithApple: jest.fn(),
    emailValue: '',
    setEmailValue: jest.fn(),
    passwordValue: '',
    setPasswordValue: jest.fn(),
    confirmPasswordValue: '',
    setConfirmPasswordValue: jest.fn(),
    userNameValue: '',
    setUserNameValue: jest.fn(),
  };

  test('calls onSignUpWithGoogle when Google icon is clicked', () => {
    render(<SignUpPageDumb {...defaultProps} />);
    fireEvent.click(screen.getByTestId('google-icon'));
    expect(defaultProps.onSignUpWithGoogle).toHaveBeenCalled();
  });

  test('calls onSignUpWithApple when Apple icon is clicked', () => {
    render(<SignUpPageDumb {...defaultProps} />);
    fireEvent.click(screen.getByTestId('apple-icon'));
    expect(defaultProps.onSignUpWithApple).toHaveBeenCalled();
  });

  test('updates email input value', () => {
    render(<SignUpPageDumb {...defaultProps} />);
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'test@example.com' },
    });
    expect(defaultProps.setEmailValue).toHaveBeenCalledWith('test@example.com');
  });

  test('updates username input value', () => {
    render(<SignUpPageDumb {...defaultProps} />);
    fireEvent.change(screen.getByLabelText('Username'), {
      target: { value: 'testuser' },
    });
    expect(defaultProps.setUserNameValue).toHaveBeenCalledWith('testuser');
  });

  test('updates password input value', () => {
    render(<SignUpPageDumb {...defaultProps} />);
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'testpassword' },
    });
    expect(defaultProps.setPasswordValue).toHaveBeenCalledWith('testpassword');
  });

  test('updates confirm password input value', () => {
    render(<SignUpPageDumb {...defaultProps} />);
    fireEvent.change(screen.getByLabelText('Confirm Password'), {
      target: { value: 'testpassword' },
    });
    expect(defaultProps.setConfirmPasswordValue).toHaveBeenCalledWith(
      'testpassword',
    );
  });
});
