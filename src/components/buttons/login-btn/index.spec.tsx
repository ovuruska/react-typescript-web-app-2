/*
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
*/

import { render } from '@testing-library/react';
import LoginBtn from '@components/buttons/login-btn/index';

describe('LoginBtn', () => {
  it('should render and match snapshot', () => {
    const wrapper = render(<LoginBtn />);
    expect(wrapper).toMatchSnapshot();
  });
});
