import React from 'react';
import TextInputFormFieldDumb from '@components/inputs/text-input-form-field/text-input-form-field.dumb';

export interface TextInputFormFieldProps {
  initialValue?: string;
  label?: string;
  onChanged?: (value: string) => void;
  disabled?: boolean;
  hidden?: boolean;
  type?: string;
}

const TextInputFormField: React.FC<TextInputFormFieldProps> = ({
  label,
  initialValue,
  onChanged,
  disabled,
  hidden = false,
  type,
}: TextInputFormFieldProps) => {
  const [value, setValue] = React.useState<string>(initialValue || '');
  const [focused, setFocused] = React.useState<boolean>(false);
  const [hiddenstate, setHiddenState] = React.useState(hidden);

  const handleHidden = () => {
    setHiddenState(!hiddenstate);
  };

  const handleFocus = (isFocused: boolean) => {
    setFocused(isFocused);
  };

  const handleChange = (value: string) => {
    setValue(value);
    onChanged && onChanged(value);
  };

  return (
    <TextInputFormFieldDumb
      disabled={disabled}
      label={label ?? 'Input'}
      focused={focused}
      onFocus={handleFocus}
      value={value}
      onChange={handleChange}
      hidden={hiddenstate}
      setHidden={handleHidden}
      type={type}
    />
  );
};

export default TextInputFormField;
