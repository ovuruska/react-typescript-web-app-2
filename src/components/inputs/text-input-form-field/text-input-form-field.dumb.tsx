import React from "react";

import style from "./text-input-form-field.module.scss";

export interface TextInputFormFieldDumbProps {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?:boolean,
  onFocus?: (focus:boolean) => void;
  focused?: boolean;

}

const TextInputFormFieldDumb: React.FC<TextInputFormFieldDumbProps> = ({
  label,
  value,
  onChange,
  onFocus,
  focused = false,
  disabled=false
                                          } : TextInputFormFieldDumbProps) => {


  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    !disabled && onChange && onChange(e.target.value);
  }

  const handleFocus = () => {
    !disabled && onFocus && onFocus(true);
  }

  const handleBlur = () => {
   !disabled && onFocus && onFocus(false);
  }

  const hasValue = !!value;
  let containerClass : string;
  let labelClass : string;

  if(!disabled && focused ){
    containerClass = style.textInputFormField__active;
    labelClass = style.textInputFormField__label__floating;
  }
  else if(disabled && hasValue){
    containerClass = style.textInputFormField__inactive;
    labelClass = style.textInputFormField__label__floating;
  }
  else if(!hasValue){
    labelClass = style.textInputFormField__label;
    containerClass = style.textInputFormField__inactive;
  }
  else {
    containerClass = style.textInputFormField__active;
    labelClass = style.textInputFormField__label__floating;
  }

  return <div data-testid={"text-input-form-field"} onFocus={handleFocus} className={containerClass}>
    <input readOnly={disabled} onChange={handleChange} value={value} onBlur={handleBlur}  className={style.textInputFormField__input} type="text" />
    <label className={labelClass}>{label}</label>
  </div>


}

export default TextInputFormFieldDumb;
