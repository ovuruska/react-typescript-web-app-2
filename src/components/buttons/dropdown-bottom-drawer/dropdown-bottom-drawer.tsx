import {useState} from "react";
import styles from "./dropdown-bottom-drawer.module.scss";
import BottomDrawer from "@components/drawers/bottom-drawer";
import CtaPrimary from "@components/buttons/cta-primary/cta-primary";
import WeakBtn from "@components/buttons/weak-btn/weak-btn";
import CheckableCard from "@components/buttons/checkable-card/checkable-card";
import {Close} from "@mui/icons-material";


export interface DropdownBottomDrawerItem<Entity> {
  id:number,
  title?:string,
  description?:string,
  value : Entity
}

export interface DropdownBottomDrawerProps<Entity> {
  label: string;
  options: DropdownBottomDrawerItem<Entity>[];
  onSelect?: (options: Entity[]) => void;
  initialState?: DropdownBottomDrawerItem<Entity>[];
}

const DropdownBottomDrawer = <T extends {}>({
                                    label, options, initialState, onSelect
}: DropdownBottomDrawerProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<DropdownBottomDrawerItem<T>[]>(initialState ?? []);

  const handleCheck = (option: DropdownBottomDrawerItem<T>) => {
    setSelected((prev ) => {
      const index = prev.findIndex((item : DropdownBottomDrawerItem<T>) => item.id === option.id);
      if (index > -1) {
        return prev.filter((item) => item.id !== option.id);
      }
      return [...prev, option];
    });
  };

  const handleContinue = () => {
    onSelect && onSelect(selected.map((item ) => item.value));
    setIsOpen(false)
  }

  const handleSelectAll = () => {
    setSelected(options);
    onSelect && onSelect(options.map((item) => item.value));
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
      title={option.title}
      content={option.description}
      checked={checked}
      onClicked={() => handleCheck(option)}
    />
      <div style={{height: "8px"}}/>
    </div>
  });

  return (<div data-testid={"dropdown-bottom-drawer"} className={styles.dropdownBtnTemplate} onClick={toggle}>
    <label className={styles.dropdownBtnTemplate__label}>{label}</label>
    <BottomDrawer  open={isOpen}>
      <div className={styles.dropdownBtnTemplate__header}>
        <h1>{label}</h1>
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
}

export default DropdownBottomDrawer;
