import React, { useRef, useState } from "react";
import "./dropdown.css";
import { IoMdArrowDropdown } from "react-icons/io";
import "../../../App.css";

interface Props {
  time: string;
}

const SlotCard: React.FC<Props> = ({ time }) => {
  return (
    <div className="slot-card">
      <span>{time}</span>
      <span></span>
    </div>
  );
};

export default SlotCard;
