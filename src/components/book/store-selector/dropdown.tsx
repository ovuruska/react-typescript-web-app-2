import React, { useRef, useState } from "react";
import "./dropdown.css";
import { IoMdArrowDropdown } from "react-icons/io";
import "../../../App.css";

interface Props {
  dropdownList: Array<string>;
}

const Dropdown: React.FC<Props> = ({ dropdownList }) => {
  const [expand, setExpand] = useState(false);

  return (
    <div
      className="dropdown"
      style={{
        maxHeight: expand ? `${(dropdownList.length + 1) * 50}px` : "50px",
      }}
    >
      <div
        className="dropdown-main dropdown-row"
        onClick={() => {
          setExpand((old) => !old);
        }}
      >
        <h1>Select Store</h1>
        <div className={`animation-rotation ${expand && "rotate"}`}>
          <IoMdArrowDropdown size={"35px"} />
        </div>
      </div>
      {dropdownList.map((store, index) => (
        <div className="dropdown-row">
          <h1>{store}</h1>
        </div>
      ))}
    </div>
  );
};

export default Dropdown;
