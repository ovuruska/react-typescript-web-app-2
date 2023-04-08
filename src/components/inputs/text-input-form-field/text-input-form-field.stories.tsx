import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import TextInputFormField, { TextInputFormFieldProps } from './text-input-form-field';

export default {
  title: 'TextInputFormField',
  component: TextInputFormField,
} as Meta;

const Template: Story<TextInputFormFieldProps> = (args) => <TextInputFormField {...args} />;

export const WithLabel = Template.bind({});
WithLabel.args = {
  label: 'Name:',
};

export const WithoutLabel = Template.bind({});
WithoutLabel.args = {
  initialValue: 'Initial Value',
};
