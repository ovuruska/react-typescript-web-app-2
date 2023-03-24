import React, { useEffect, useState } from "react";
import GroomingIcon from "../icons/grooming-icon";
import WeWashIcon from "../icons/wewash-icon";
import "./service-card.css";

interface Props {
  svgSrc: string;
  title: string;
  subtitle: string;
}

const ServiceCard: React.FC<Props> = ({ svgSrc, title, subtitle }) => {
  const [colorScheme, setcolorScheme] = useState<number>(0);

  useEffect(() => {
    if (title === "Grooming") {
      setcolorScheme(0);
    } else {
      setcolorScheme(1);
    }
  }, [title]);

  return (
    <div
      className={`service-card ${
        colorScheme === 0 ? "card-green" : "card-purple"
      }`}
      onClick={() => {
        console.log("clicked");
      }}
    >
      <div className="left-column">
        {colorScheme === 0 ? <GroomingIcon /> : <WeWashIcon fill="#4947CA" />}
      </div>
      <div className="right-column">
        <h1>{title}</h1>
        <h2>{subtitle}</h2>
      </div>
    </div>
  );
};

export default ServiceCard;
