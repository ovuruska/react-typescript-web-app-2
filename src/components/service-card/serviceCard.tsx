import './serviceCard.css';
import * as React from "react";
export interface CardProps {
  svg: React.ReactNode;
  title: string;
  subtitle: string;
  onClick?: () => void;
}

export const CardComponent: React.FC<CardProps> = ({ svg, title, subtitle, onClick }) => {
  // Also, add a role="button" and tabIndex={0} to the card's container element to make it more accessible and easier to test.
  // Add a data-testid attribute to the CardComponent's SVG container element to make it easier to select in the tests:



  return ( <div className="card" onClick={onClick} role="button" tabIndex={0}>

  <div className="card-content">
  <div className="card-svg" data-testid="card-svg">{svg}</div>
    <div className="card-text">
  <h4 className="card-title">{title}</h4>
    <p className="card-subtitle">{subtitle}</p>
    </div>
    </div>
    </div>
);
};
