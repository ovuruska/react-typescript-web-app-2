import LoginPageDumb, { LoginPageDumbProps } from '@pages/login/login.dumb';
import { render, fireEvent } from '@testing-library/react';
import { ReactNode } from 'react';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Link: ({ children, to }: { children: ReactNode; to: string }) => (
    <a href={to}>{children}</a>
  ),
}));

describe('Login page', () => {
  const defaultProps: LoginPageDumbProps = {
    onLogin: jest.fn(),
    onForgotPassword: jest.fn(),
    onLoginWithGoogle: jest.fn(),
    onLoginWithApple: jest.fn(),
    emailValue: '',
    setEmailValue: jest.fn(),
    passwordValue: '',
    setPasswordValue: jest.fn(),
  };

  it('should be defined.', () => {
    expect(LoginPageDumb).toBeDefined();
  });

  it('should render correctly.', () => {
    const onLogin = jest.fn();
    const setPass = jest.fn();
    const setEmail = jest.fn();
    const { container } = render(
      <LoginPageDumb
        onLogin={onLogin}
        setEmailValue={setEmail}
        setPasswordValue={setPass}
        passwordValue="password"
        emailValue="email"
      />,
    );
    expect(container).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('calls setEmailValue when email input changes', () => {
    const { getByLabelText } = render(<LoginPageDumb {...defaultProps} />);
    fireEvent.change(getByLabelText('Email'), {
      target: { value: 'test@example.com' },
    });
    expect(defaultProps.setEmailValue).toHaveBeenCalledWith('test@example.com');
  });

  it('calls setPasswordValue when password input changes', () => {
    const { getByLabelText } = render(<LoginPageDumb {...defaultProps} />);
    fireEvent.change(getByLabelText('Password'), {
      target: { value: 'test-password' },
    });
    expect(defaultProps.setPasswordValue).toHaveBeenCalledWith('test-password');
  });

  // TODO: Add more tests
});
