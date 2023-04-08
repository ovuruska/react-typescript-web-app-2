import style from './login.module.scss';

interface LoginPageProps {
  text: string;
}

const text = "We understand that your furry friends deserve the best care, " +
  "and we're here to provide it with our top-notch grooming and washing services."


const LoginPageDumb :React.FC<LoginPageProps> = () => {
  return <div className={style.loginPage}>
  </div>
}

export default LoginPageDumb;
