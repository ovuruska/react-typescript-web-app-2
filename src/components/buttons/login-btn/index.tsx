import style from './index.module.scss';

export interface LoginBtnProps {
  onClick?: () => void;
  text: string;
}

const LoginBtn: React.FC<LoginBtnProps> = ({ onClick, text }) => {
  return (
    <a className={style.loginBtn} onClick={onClick}>
      {text}
    </a>
  );
};

export default LoginBtn;
