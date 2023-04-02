import React, { useRef, useState } from "react";
import "./dropdown.css";
import { IoMdArrowDropdown } from "react-icons/io";
import "../../../App.css";

interface Props {
  dropdownList: Array<string>;
  width: string;
  dropdownTitle: string;
}

const Dropdown: React.FC<Props> = ({ dropdownList, width, dropdownTitle }) => {
  const [expand, setExpand] = useState<Boolean>(false);
  const [activeIndex, setAciveIndex] = useState<number>(-1);

  return (
    <div
      className="dropdown"
      style={{
        maxHeight: expand ? `${(dropdownList.length + 1) * 50}px` : "50px",
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
          {activeIndex === -1 ? dropdownTitle : dropdownList[activeIndex]}
        </h1>
        <div className={`animation-rotation ${expand && "rotate"}`}>
          <IoMdArrowDropdown size={"35px"} />
        </div>
      </div>
      {dropdownList.map((store, index) => (
        <div
          className="dropdown-row"
          onClick={() => {
            setAciveIndex(index);
            setExpand(false);
          }}
        >
          <h1>{store}</h1>
        </div>
      ))}
    </div>
  );
};

export default Dropdown;
