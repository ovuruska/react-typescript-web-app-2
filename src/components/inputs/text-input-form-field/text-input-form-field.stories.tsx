import React from 'react';
import { Story, Meta } from '@storybook/react';
import TextInputFormFieldDumb, {
  TextInputFormFieldDumbProps,
} from './text-input-form-field.dumb';

export default {
  title: 'Components/Inputs/TextInputFormFieldDumb',
  component: TextInputFormFieldDumb,
};

const Template: Story<TextInputFormFieldDumbProps> = (args) => (
  <TextInputFormFieldDumb {...args} />
);

export const Default = Template.bind({});
Default.args = {
  label: 'Label',
  value: 'Value',
  onChange: (value) => console.log(value),
  disabled: false,
};

export const WithoutValue = Template.bind({});
WithoutValue.args = {
  label: 'Label',
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Label',
  value: 'Value',
  onChange: (value) => console.log(value),
  disabled: true,
};

export const DisabledWithoutValue = Template.bind({});
DisabledWithoutValue.args = {
  label: 'Label',
  onChange: (value) => console.log(value),
  disabled: true,
};

export const NoInputs = Template.bind({});
NoInputs.args = {};

const WritableTemplate: Story<TextInputFormFieldDumbProps> = (args) => {
  const [value, setValue] = React.useState(args.value || '');
  const [focused, setFocused] = React.useState(false);

  const handleFocus = (isFocused: boolean) => {
    setFocused(isFocused);
  };

  return (
    <TextInputFormFieldDumb
      {...args}
      focused={focused}
      onFocus={handleFocus}
      value={value}
      onChange={setValue}
    />
  );
};

export const Writable = WritableTemplate.bind({});
Writable.args = {
  label: 'Label',
};

const HiddenTemplate: Story<TextInputFormFieldDumbProps> = (args) => {
  const [value, setValue] = React.useState(args.value || '');
  const [focused, setFocused] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);

  const handleHidden = () => {
    setHidden(!hidden);
  };

  const handleFocus = (isFocused: boolean) => {
    setFocused(isFocused);
  };

  return (
    <TextInputFormFieldDumb
      {...args}
      focused={focused}
      onFocus={handleFocus}
      value={value}
      onChange={setValue}
      hidden={hidden}
      type="password"
      setHidden={handleHidden}
    />
  );
};

export const Hidden = HiddenTemplate.bind({});
Hidden.args = {
  label: 'Password',
};
