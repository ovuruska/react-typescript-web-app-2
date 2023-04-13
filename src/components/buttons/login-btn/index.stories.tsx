import LoginBtn from '.';
import { Story } from '@storybook/react';
import { LoginBtnProps } from './index';
import { BrowserRouter } from 'react-router-dom';
export default {
  title: 'Components/Buttons/LoginBtn',
  component: LoginBtn,
};

const Template: Story<LoginBtnProps> = (args) => (
  <BrowserRouter>
    <LoginBtn {...args} />
  </BrowserRouter>
);

export const Default = Template.bind({});
