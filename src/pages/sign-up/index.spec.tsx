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
    emailValue: '',
    setEmailValue: jest.fn(),
    passwordValue: '',
    setPasswordValue: jest.fn(),
    confirmPasswordValue: '',
    setConfirmPasswordValue: jest.fn(),
    firstName: '',
    setFirstName: jest.fn(),
    lastName: '',
    setLastName: jest.fn(),
  };
  test('updates email input value', () => {
    render(<SignUpPageDumb {...defaultProps} />);
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'test@example.com' },
    });
    expect(defaultProps.setEmailValue).toHaveBeenCalledWith('test@example.com');
  });

  test('updates first name input value', () => {
    render(<SignUpPageDumb {...defaultProps} />);
    fireEvent.change(screen.getByLabelText('First name'), {
      target: { value: 'testuser' },
    });
    expect(defaultProps.setFirstName).toHaveBeenCalledWith('testuser');
  });

  test('updates last name input value', () => {
    render(<SignUpPageDumb {...defaultProps} />);
    fireEvent.change(screen.getByLabelText('Last name'), {
      target: { value: 'testuser' },
    });
    expect(defaultProps.setLastName).toHaveBeenCalledWith('testuser');
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
    fireEvent.change(screen.getByLabelText('Confirm password'), {
      target: { value: 'testpassword' },
    });
    expect(defaultProps.setConfirmPasswordValue).toHaveBeenCalledWith(
      'testpassword',
    );
  });
});
