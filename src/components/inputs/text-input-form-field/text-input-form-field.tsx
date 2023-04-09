import React from 'react';
import TextInputFormFieldDumb from '@components/inputs/text-input-form-field/text-input-form-field.dumb';


export interface TextInputFormFieldProps {
  initialValue?: string;
  label?: string;
  onChanged?: (value: string) => void;
  disabled?: boolean,
}

const TextInputFormField : React.FC<TextInputFormFieldProps> = ({
                              label, initialValue, onChanged, disabled,
                            }: TextInputFormFieldProps) => {

  const [value, setValue] = React.useState<string>(initialValue || '');
  const [focused, setFocused] = React.useState<boolean>(false);

  const handleFocus = (isFocused: boolean) => {
    setFocused(isFocused);
  };

  const handleChange = (value: string) => {
    setValue(value);
    onChanged && onChanged(value);
  };

  return <TextInputFormFieldDumb disabled={disabled} label={label ?? 'Input'} focused={focused} onFocus={handleFocus}
                                 value={value} onChange={handleChange} />;
};

export default TextInputFormField;
