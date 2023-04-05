import styles from "./checkable-card.module.scss";
import Checkbox from "@components/buttons/checkbox/checkbox";

interface CheckableCardProps {
  title?: string;
  content?: string;
  checked: boolean;
  onChecked?: (state: boolean) => void;
}

const CheckableCard : React.FC<CheckableCardProps> = ({
  title,
  content,
  checked,
  onChecked

}) => {

  const handleCheck = () => {
    onChecked && onChecked(!checked);
  }
  return <div onClick={handleCheck} className={(checked) ? styles.checkableCard__checked : styles.checkableCard}>
    <div className={  styles.checkableCard__left} >
      {title && <div className={(checked) ? styles.checkableCard__title__checked : styles.checkableCard__title}>{title}</div>}
      {content && <div className={styles.checkableCard__content}>{content}</div>}
    </div>
    <div className={styles.checkableCard__right}>
      <Checkbox checked={checked} onChecked={onChecked} />
    </div>

  </div>
}

export default CheckableCard
