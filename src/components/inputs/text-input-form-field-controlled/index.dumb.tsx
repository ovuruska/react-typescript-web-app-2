import React from 'react';

import style from './text-input-form-field.module.scss';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

export interface TextInputFormFieldControlledDumbProps {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  onFocus?: (focus: boolean) => void;
  focused?: boolean;
  hidden?: boolean;
  setHidden: () => void;
  type?: string;
}

const TextInputFormFieldControlledDumb: React.FC<TextInputFormFieldControlledDumbProps> = ({
                                                                         label,
                                                                         value,
                                                                         onChange,
                                                                         onFocus,
                                                                         focused = false,
                                                                         disabled = false,
                                                                         hidden,
                                                                         setHidden,
                                                                         type,
                                                                       }: TextInputFormFieldControlledDumbProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    !disabled && onChange && onChange(e.target.value);
  };

  const handleFocus = () => {
    !disabled && onFocus && onFocus(true);
  };

  const handleBlur = () => {
    !disabled && onFocus && onFocus(false);
  };

  const hasValue = !!value;
  let containerClass: string;
  let labelClass: string;

  if (!disabled && focused) {
    containerClass = style.textInputFormField__active;
    labelClass = style.textInputFormField__label__floating;
  } else if (disabled && hasValue) {
    containerClass = style.textInputFormField__inactive;
    labelClass = style.textInputFormField__label__floating;
  } else if (!hasValue) {
    labelClass = style.textInputFormField__label;
    containerClass = style.textInputFormField__inactive;
  } else {
    containerClass = style.textInputFormField__active;
    labelClass = style.textInputFormField__label__floating;
  }

  return (
    <div onFocus={handleFocus} className={containerClass}>
      <input
        readOnly={disabled}
        onChange={handleChange}
        value={value}
        onBlur={handleBlur}
        className={style.textInputFormField__input}
        type={hidden ? 'password' : 'text'}
      />
      {type === 'password' &&
        (hidden ? (
          <button className={style.eyeBtn} onClick={() => setHidden()}>
            <AiOutlineEyeInvisible className={style.textInputFormField__icon} />
          </button>
        ) : (
          <button className={style.eyeBtn} onClick={() => setHidden()}>
            <AiOutlineEye
              onClick={() => setHidden()}
              className={style.textInputFormField__icon}
            />
          </button>
        ))}
      <label className={labelClass}>{label}</label>
    </div>
  );
};

export default TextInputFormFieldControlledDumb;
