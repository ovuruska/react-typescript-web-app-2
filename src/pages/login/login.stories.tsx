import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import LoginPageDumb, { LoginPageDumbProps } from './login.dumb';
import { BrowserRouter } from 'react-router-dom';

export default {
  title: 'Pages/Login',
  component: LoginPageDumb,
} as Meta;

const Template: Story<LoginPageDumbProps> = (args) => {
  const [emailValue, setEmailValue] = React.useState('');
  const [passwordValue, setPasswordValue] = React.useState('');
  return (
    <BrowserRouter>
      <LoginPageDumb
        {...args}
        emailValue={emailValue}
        setEmailValue={setEmailValue}
        passwordValue={passwordValue}
        setPasswordValue={setPasswordValue}
      />
    </BrowserRouter>
  );
};

export const Default = Template.bind({});
Default.args = {};
