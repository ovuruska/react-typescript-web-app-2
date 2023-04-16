import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { OrderActions } from "../../../store/order-slice";
import { Link } from "react-router-dom";
import GroomingIcon from "../../icons/grooming-icon";
import WeWashIcon from "../../icons/wewash-icon";

import "./service-card.css";

interface Props {
  title: string;
  subtitle: string;
}

const ServiceCard: React.FC<Props> = ({  title, subtitle }) => {
  const [colorScheme, setcolorScheme] = useState<number>(0);
  const dispatch = useDispatch();
  useEffect(() => {
    if (title === "Grooming") {
      setcolorScheme(0);
    } else {
      setcolorScheme(1);
    }
  }, [title]);

  return (
    <Link
      to={"/book"}
      className="navigation-link-service"
      onClick={() => {
        dispatch(OrderActions.setOrderType(title));
      }}
    >
      <div
        className={`service-card ${
          colorScheme === 0 ? "card-green" : "card-purple"
        }`}
      >
        <div className="left-column">
          {colorScheme === 0 ? <GroomingIcon /> : <WeWashIcon fill="#4947CA" />}
        </div>
        <div className="right-column">
          <h1>{title}</h1>
          <h2>{subtitle}</h2>
        </div>
      </div>
    </Link>
  );
};

export default ServiceCard;
