import React from 'react';

import style from './index.module.scss';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

export interface TextInputFormFieldDumbProps {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean,
  onFocus?: (focus: boolean) => void;
  focused?: boolean;
  errorMessage?: string;
  validator?: (value: string) => boolean;
  hidden?: boolean;
  setHidden: () => void;
  type?: string;
}

const TextInputFormFieldDumb: React.FC<TextInputFormFieldDumbProps> = ({
                                                                         label,
                                                                         value,
                                                                         onChange,
                                                                         onFocus,
                                                                         focused = false,
                                                                         disabled = false,
                                                                         validator,
                                                                         type,
                                                                         hidden,
                                                                         setHidden,
                                                                         errorMessage,
                                                                       }: TextInputFormFieldDumbProps) => {


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled && onChange) {
      if (!validator || validator(e.target.value)) onChange(e.target.value);
    }
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

  const inputType = (type === 'password' && hidden) ? 'password' : 'text';


  return <>
    <div data-testid={'text-input-form-field'} onFocus={handleFocus} className={containerClass}>
      <input readOnly={disabled} onChange={handleChange} value={value} onBlur={handleBlur}
             className={style.textInputFormField__input} type={inputType} />
      {type === 'password' && (hidden ? (
        <button data-testid={'text-input-form-field-show-button'} className={style.eyeBtn} onClick={() => setHidden()}>
          <AiOutlineEye
            onClick={() => setHidden()}
            className={style.textInputFormFieldControlled__icon}
          />
        </button>) : (
        <button data-testid={'text-input-form-field-hide-button'} className={style.eyeBtn} onClick={() => setHidden()}>
          <AiOutlineEyeInvisible
            className={style.textInputFormFieldControlled__icon}
          />
        </button>))}
      <label className={labelClass}>{label}</label>
    </div>
    {errorMessage && <div className={style.textInputFormField__error}>{errorMessage}</div>}
  </>;


};

export default TextInputFormFieldDumb;
