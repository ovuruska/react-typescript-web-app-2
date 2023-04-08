import styles from "./text-input-form-field.module.scss";
import { useState } from 'react';


export interface TextInputFormFieldProps {
  initialValue?: string;
  label?: string;
  onChanged?: (value:string) => void;
}

const TextInputFormField = ({
                               label,
                               initialValue,
                                onChanged
                             }:TextInputFormFieldProps) => {

  const [value, setValue] = useState(initialValue || "");

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onChanged && onChanged(e.target.value);
  }


  return <div data-testid={"text-inputs-controlled"} className={styles.textInputControlled} >
    <label className={!value ? styles.textInputControlled__label : styles.textInputControlled__label__floating}>{label}</label>
    <input className={styles.textInputControlled__input} value={value} onChange={handleChange} />
    {value ? <div className={styles.textInputControlled__value}>{value}</div> : null }
  </div>;
}

export default TextInputFormField;
