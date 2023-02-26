import Icon1Src from "../../assets/nav/icon1.png";
import Icon2Src from "../../assets/nav/icon2.png";
import Icon3Src from "../../assets/nav/icon3.png";
import Icon4Src from "../../assets/nav/icon4.png";
import Icon5Src from "../../assets/nav/icon5.png";

import { Link } from "react-router-dom";

import "./bottomNav.css";

export default function BottomNavBar() {
  return (
    <nav className="nav-bottom">
      <div className="center-wrapper">
        <Link to="/" className="icon-column">
          <img src={Icon1Src} alt="navigation icon"></img>
          <h3>Home</h3>
        </Link>
        <Link to="/" className="icon-column">
          <img src={Icon2Src} alt="navigation icon"></img>
          <h3>Booking</h3>
        </Link>
        <Link to="/" className="icon-column">
          <img src={Icon3Src} alt="navigation icon"></img>
          <h3>Scrubbers Card</h3>
        </Link>
        <Link to="/" className="icon-column">
          <img src={Icon4Src} alt="navigation icon"></img>
          <h3>Groomers</h3>
        </Link>
        <Link to="/" className="icon-column">
          <img src={Icon5Src} alt="navigation icon"></img>
          <h3>Shop</h3>
        </Link>
      </div>
    </nav>
  );
}
