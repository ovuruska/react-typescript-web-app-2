import style from './login.module.scss';

export interface LoginPageDumbProps {
  onLogin: (username:string, password:string) => void;
  onForgotPassword: () => void;
  onLoginWithGoogle: () => void;
  onLoginWithApple: () => void;
}

const text = "We understand that your furry friends deserve the best care, " +
  "and we're here to provide it with our top-notch grooming and washing services."


const LoginPageDumb :React.FC<LoginPageDumbProps> = () => {
  return <div className={style.loginPage}>
  </div>
}

export default LoginPageDumb;
