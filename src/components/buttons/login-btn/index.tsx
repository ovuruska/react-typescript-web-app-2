import style from './index.module.scss';

export interface LoginBtnProps {
  onClick?: () => void;
}

const LoginBtn: React.FC<LoginBtnProps> = ({ onClick }) => {
  return (
    <a className={style.loginBtn} onClick={onClick}>
      Login
    </a>
  );
};

export default LoginBtn;
