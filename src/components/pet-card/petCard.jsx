import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import mockPhotoSrc from "../../assets/pet-card/dogmock.png";
import useFetchPets from "../../hooks/useFetchPets";
import "./petCard.css";

export default function PetCard() {
  const [selectedpet, setselectedpet] = useState(0);

  const pets = useSelector((state) => {
    return state.pets.pets;
  });

  return (
    <div className="pet-card-wrapper">
      {pets.length === 0 ? (
        <div className="pet-card-mock"></div>
      ) : (
        pets.map((pet, ind) => {
          return (
            <div
              onClick={() => {
                setselectedpet(ind);
              }}
              key={ind}
              className={`pet-card ${
                ind !== selectedpet && "pet-card-non-active"
              }`}
              style={{
                width:
                  pets.length > 0
                    ? String(100 / pets.length - 5) + "%"
                    : "100%",
              }}
            >
              <img src={mockPhotoSrc}></img>
              <div className="name-wrapper">
                <h1>{pet.name}</h1>
              </div>
              {pets.length < 2 && (
                <div className="groom-wash-wrapper">
                  <div className="groom-wash-card">
                    <h3 className="number-h3">7</h3>
                    <h3>GROOMING</h3>
                  </div>
                  <div className="groom-wash-card">
                    <h3 className="number-h3">3</h3>
                    <h3>WEWASH</h3>
                  </div>
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}
