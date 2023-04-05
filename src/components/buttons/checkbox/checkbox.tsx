import styles from "./checkbox.module.scss";
interface CheckboxProps {
  checked: boolean;
  onChecked?: (state: boolean) => void;
  label?:string;
}
import DoneIcon from '@mui/icons-material/Done';

const Checkbox : React.FC<CheckboxProps> = ({
  checked,
  onChecked,
  label
}) => {
  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChecked && onChecked(!checked);
  };

  return <div className={checked ? styles.checkbox__checked : styles.checkbox}>
    <label>{label}</label>
    <input type="checkbox"  onChange={handleCheck} checked={checked}/>
    {checked && <DoneIcon />  }
  </div>
}

export default Checkbox
