import React from 'react';
import TextInputFormFieldDumb from '@components/inputs/text-input-form-field/index.dumb';


export interface TextInputFormFieldProps {
  initialValue?: string;
  label?: string;
  onChanged?: (value: string) => void;
  disabled?: boolean,
  type?: string;
  errorMessage?: string;
  validator?: (value: string) => boolean;
}

const TextInputFormField: React.FC<TextInputFormFieldProps> = ({
                                                                 errorMessage,
                                                                 validator,
                                                                 label,
                                                                 initialValue,
                                                                 onChanged,
                                                                 disabled,
                                                                 type = 'text',
                                                               }: TextInputFormFieldProps) => {

  if(validator && initialValue && !validator(initialValue)){
    initialValue = '';
  }

  const [value, setValue] = React.useState<string>(initialValue || '');
  const [focused, setFocused] = React.useState<boolean>(false);
  const [hiddenState, setHiddenState] = React.useState(type === 'password');

  const handleHidden = () => {
    setHiddenState(!hiddenState);
  };

  const handleFocus = (isFocused: boolean) => {
    setFocused(isFocused);
  };

  const handleChange = (value: string) => {
    setValue(value);
    onChanged && onChanged(value);
  };

  return <TextInputFormFieldDumb disabled={disabled} label={label ?? 'Input'} focused={focused} onFocus={handleFocus}
                                 type={type} hidden={hiddenState}
                                 setHidden={handleHidden}
                                 errorMessage={errorMessage}
                                 validator={validator}
                                 value={value} onChange={handleChange} />;
};

export default TextInputFormField;
