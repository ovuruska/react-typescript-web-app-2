import { useState } from "react";
import { BsFillGearFill } from "react-icons/bs";
import "./appointments.css";

export default function Appointments() {
  const [selectedApt, setSelectedApt] = useState(-1);
  const appointments = [0, 0, 0, 0, 0];
  return (
    <div className="appointments-wrapper">
      {appointments.map((app, i) => {
        return (
          <div
            key={i}
            className="appointment"
            onClick={() => {
              setSelectedApt(i);
            }}
            style={{
              border: i === selectedApt && "1px solid #3894D7",
            }}
          >
            <h3>
              <span className="bold-date">Mon-01/23/2023 9:00</span> | Kris
              <span style={{ paddingRight: "8px" }}>|</span>
              Royal Oaks
            </h3>
            <BsFillGearFill
              style={{ marginLeft: "8px", marginBottom: "2px" }}
            />
          </div>
        );
      })}
    </div>
  );
}
