import SignUpPageDumb, { SignUpPageDumbProps } from './index.dumb';
import { Story, Meta } from '@storybook/react/types-6-0';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

export default {
  title: 'Pages/SignUp',
  component: SignUpPageDumb,
} as Meta;

const Template: Story<SignUpPageDumbProps> = (args) => {
  const [emailValue, setEmailValue] = React.useState('');
  const [passwordValue, setPasswordValue] = React.useState('');
  const [confirmPasswordValue, setConfirmPasswordValue] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  return (
    <BrowserRouter>
      <SignUpPageDumb
        {...args}
        emailValue={emailValue}
        setEmailValue={setEmailValue}
        passwordValue={passwordValue}
        setPasswordValue={setPasswordValue}
        confirmPasswordValue={confirmPasswordValue}
        setConfirmPasswordValue={setConfirmPasswordValue}
        firstName={firstName}
        setFirstName={setFirstName}
        lastName={lastName}
        setLastName={setLastName}
      />
    </BrowserRouter>
  );
};
export const Default = Template.bind({});
Default.args = {};
