import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { OrderActions } from "../../../store/order-slice";
import { Link, useNavigate } from 'react-router-dom';
import GroomingIcon from "../../icons/grooming-icon";
import WeWashIcon from "../../icons/wewash-icon";

import "./service-card.css";

interface Props {
  title: string;
  subtitle: string;
  onClick?: () => boolean;
}

const ServiceCard: React.FC<Props> = ({  title, onClick, subtitle }) => {
  const [colorScheme, setcolorScheme] = useState<number>(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (title === "Grooming") {
      setcolorScheme(0);
    } else {
      setcolorScheme(1);
    }
  }, [title]);

  const handleBookingStart = () => {

    // TODO: This is a hacky way to do this. We should be able to do this in a better way.
    onClick && onClick() &&     dispatch(OrderActions.setOrderType(title)) && navigate("/book");
  }

  return (
    <div
      className="navigation-link-service"
      onClick={handleBookingStart}
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
    </div>
  );
};

export default ServiceCard;
