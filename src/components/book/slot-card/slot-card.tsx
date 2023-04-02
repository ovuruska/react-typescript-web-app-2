import React, { useRef, useState } from "react";
import { BiTimeFive } from "react-icons/bi";
import "../../../App.css";
import "./slot-card.css";

interface Props {
  time: string;
}

const SlotCard: React.FC<Props> = ({ time }) => {
  return (
    <div className="slot-card">
      <span>{time}</span>

      <BiTimeFive size={"20px"} />
    </div>
  );
};

export default SlotCard;
