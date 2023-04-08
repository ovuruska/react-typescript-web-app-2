import React, { useRef, useState } from "react";
import "./dropdown.scss";
import { IoMdArrowDropdown } from "react-icons/io";
import "../../../App.css";

interface Props {
  dropdownList: Array<string>;
  width: string;
  dropdownTitle: string;
}

const Dropdown: React.FC<Props> = ({ dropdownList, width, dropdownTitle }) => {
  const [expand, setExpand] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  return (
    <div
      className="dropdown"
      style={{
        height: expand ? `${(dropdownList.length + 1) * 50}px` : "50px",
        width: width,
      }}
    >
      <div
        className="dropdown-main dropdown-row"
        onClick={() => {
          setExpand((old) => !old);
        }}
      >
        <li>
          {activeIndex === -1 ? dropdownTitle : dropdownList[activeIndex]}
        </li>
        <div className={`animation-rotation ${expand && "rotate"}`}>
          <IoMdArrowDropdown size={"35px"} />
        </div>
      </div>
      {dropdownList.map((store, index) => (
        <div
          key={index}
          className="dropdown-row"
          onClick={() => {
            setActiveIndex(index);
            setExpand(false);
          }}
        >
          <li>{store}</li>
        </div>
      ))}
    </div>
  );
};

export default Dropdown;
