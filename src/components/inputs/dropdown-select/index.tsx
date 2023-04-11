import React, { ChangeEvent, useState } from 'react';
import styles from "./index.module.scss";
import CheckableCard from '@components/cards/checkable-card/checkable-card';
import SelectBottomDrawer from '@components/drawers/select-bottom-drawer/select-bottom-drawer';
import { Close } from '@mui/icons-material';
import CtaPrimary from '@components/buttons/cta-primary/cta-primary';


export interface DropdownSelectItem<T> {
  value: T;
  label: string;
}

export interface DropdownSelectProps<T> {
  onSelect?: (value: T) => void;
  initialValue?: DropdownSelectItem<T>;
  options: DropdownSelectItem<T>[];
  label?: string;
}

const DropdownSelect = <T,>({ onSelect, initialValue, options, label }: DropdownSelectProps<T>): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<DropdownSelectItem<T> | null>(initialValue ?? null);

  const handleCheck = (option: DropdownSelectItem<T>) => {
   setSelected(option);
   onSelect && onSelect(option.value);
  };

  const toggle = () => setIsOpen(!isOpen);

  const cards = options.map((option) => {
    const checked = selected?.value === option.value;
    return <div onClick={() => handleCheck(option)} data-testid={"dropdown-select-option-item"}><CheckableCard
      key={option.label}
      title={option.label}
      checked={checked}
    />
      <div style={{height: "8px"}}/>
    </div>
  });

  const handleContinue = () => {
    setIsOpen(false)
  }


  return (<div data-testid={"dropdown-select"} className={styles.dropdownBtnTemplate} onClick={toggle}>
    {label && <label className={!selected ? styles.dropdownBtnTemplate__label : styles.dropdownBtnTemplate__label__floating}>{label}</label>}
    {!!selected ? <div data-testid={"dropdown-select-value"} className={styles.dropdownBtnTemplate__value}>{selected.label}</div> : null }
    <SelectBottomDrawer open={isOpen}>
      <div className={styles.dropdownBtnTemplate__header}>
        <h1>{label}</h1>
        <Close onClick={toggle}/>
      </div>
      <div style={{height: "16px"}}/>
      <>
        {...cards}
      </>

      <div style={{height: "8px"}}/>
      <CtaPrimary onClick={handleContinue} content={"Select"}/>
    </SelectBottomDrawer>

  </div>);
};

export default DropdownSelect;