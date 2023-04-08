import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import LoginPageDumb, { LoginPageDumbProps } from './login.dumb';

export default {
  title: 'LoginPageDumb',
  component: LoginPageDumb,
} as Meta;

const Template: Story<LoginPageDumbProps> = (args) => <LoginPageDumb {...args} />;

export const Default = Template.bind({});
Default.args = {
};
