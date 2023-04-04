import React, { useState } from 'react';
import './dropdown.css';
import { IoMdArrowDropdown } from 'react-icons/io';
import '../../../App.css';

interface Props<T> {
  dropdownList: Array<T>;
  width: string;
  dropdownTitle: string;
  displayItem: (item: T) => string;
  onItemSelected?: (item: T) => void;
}

const DropdownWithTemplate = <T,>({
                        dropdownList,
                        width,
                        dropdownTitle,
                        displayItem,
                        onItemSelected,
                      }: Props<T>) => {
  const [expand, setExpand] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const handleItemClick = (index: number) => {
    setActiveIndex(index);
    setExpand(false);

    if (onItemSelected) {
      onItemSelected(dropdownList[index]);
    }
  };
  return (
    <div
      className="dropdown"
      style={{
        maxHeight: expand ? `${(dropdownList.length + 1) * 50}px` : '50px',
        width: width,
      }}
    >
      <div
        className="dropdown-main dropdown-row"
        onClick={() => {
          setExpand((old) => !old);
        }}
      >
        <h1>
          {activeIndex === -1 ? dropdownTitle : displayItem(dropdownList[activeIndex])}
        </h1>
        <div className={`animation-rotation ${expand && 'rotate'}`}>
          <IoMdArrowDropdown size={'35px'} />
        </div>
      </div>
      {dropdownList.map((item, index) => (
        <div
          key={index}
          className="dropdown-row"
          onClick={() => handleItemClick(index)}
        >
          <h1>{displayItem(item)}</h1>
        </div>
      ))}
    </div>
  );
};

export default DropdownWithTemplate;
