import {useState} from "react";
import styles from "./dropdown-btn.module.scss";
import BottomDrawer from "@components/drawers/bottom-drawer";
import CtaPrimary from "@components/buttons/cta-primary/cta-primary";
import WeakBtn from "@components/buttons/weak-btn/weak-btn";
import CheckableCard from "@components/buttons/checkable-card/checkable-card";
import {Close} from "@mui/icons-material";
import {BranchEntity} from "@domain/types/common/branch";

export interface DropdownBtnProps {
  label: string;
  options: BranchEntity[];
  onSelect?: (options: BranchEntity[]) => void;
  initialState?: BranchEntity[];
}


const DropdownBtnBottomDrawer = ({
                                   label, options, initialState, onSelect
                                 }: DropdownBtnProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<BranchEntity[]>(initialState ?? []);

  const handleCheck = (option: BranchEntity) => {
    setSelected((prev) => {
      const index = prev.findIndex((item) => item.id === option.id);
      if (index > -1) {
        return prev.filter((item) => item.id !== option.id);
      }
      return [...prev, option];
    });
  };

  const handleContinue = () => {
    onSelect && onSelect(selected);
    setIsOpen(false)
  }

  const handleSelectAll = () => {
    setSelected(options);
    onSelect && onSelect(options);
    setIsOpen(false)
  }

  const handleClearAll = () => {
    setSelected([]);
    onSelect && onSelect([]);
    setIsOpen(false)
  }

  const toggle = () => setIsOpen(!isOpen);

  const cards = options.map((option) => {
    const checked = selected.findIndex((item) => item.id === option.id) > -1;
    return <div><CheckableCard
      key={option.id}
      title={option.name}
      content={option.address}
      checked={checked}
      onChecked={() => handleCheck(option)}
    />
      <div style={{height: "8px"}}/>
    </div>
  });

  return (<div className={styles.dropdownBtnTemplate} onClick={toggle}>
      <label className={styles.dropdownBtnTemplate__label}>{label}</label>
      <BottomDrawer  open={isOpen}>
        <div className={styles.dropdownBtnTemplate__header}>
          <h1>Select Store</h1>
          <Close onClick={toggle}/>
        </div>
        <div style={{height: "16px"}}/>
        <>
          {...cards}
        </>
        <WeakBtn onClick={handleClearAll} content={"Clear all selections"}/>
        <div style={{height: "8px"}}/>

        <WeakBtn onClick={handleSelectAll} content={"Select All"}/>
        <div style={{height: "8px"}}/>
        <CtaPrimary onClick={handleContinue} content={"Continue"}/>
      </BottomDrawer>

    </div>);
};

export default DropdownBtnBottomDrawer;
