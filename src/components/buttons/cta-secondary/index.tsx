import React from "react";
import style from "./index.module.scss";

export interface CtaSecondaryProps {
  onClick?: () => void;
  text?: string;

}

const CtaSecondary : React.FC<CtaSecondaryProps> = ({
  onClick,
  text
}:CtaSecondaryProps) => {

  return <div data-testid={"cta-secondary"} onClick={onClick} className={style.ctaSecondary}>
    <label className={style.ctaSecondary__label}>{text}</label>
  </div>
}

export default CtaSecondary
