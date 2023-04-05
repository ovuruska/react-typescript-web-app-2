import styles from "./cta-primary.module.css";
interface CtaPrimaryProps {
  content: string;
  onClick?: () => void;
}

const CtaPrimary : React.FC<CtaPrimaryProps> = ({
  content,
  onClick
                    }) => {

  return <button onClick={onClick} className={styles.ctaPrimary}>
    <label className={styles.ctaPrimary__label}>{content}</label>
  </button>

}

export default CtaPrimary
