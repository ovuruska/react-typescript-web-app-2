import "./profile-card.css";
import "../../../App.css";
import React from "react";
import PetCard from "../../cards/pet-card/pet-card";
import bgSrc from "../../../assets/bgtop.png";
import CarouselSlider from "../../carousel-slider/carousel-slider";
import ProfileBtn from "../../buttons/profile-btn";
import AddBtn from "../../buttons/add-btn";
import { useNavigate } from 'react-router-dom';

interface Props {}

const ProfileCard: React.FC<Props> = ({}) => {

  const navigate = useNavigate();
  const handleAddClick = () => {
    navigate("/add-pet");
  }


  return (
    <div className="profile">
      <div className="row row1">
        <div className="icons">
          <ProfileBtn />
          <AddBtn onClick={handleAddClick}/>
        </div>
      </div>
      <div className="row pets-slider">
        <CarouselSlider
          args={[
            { name: "John Foo", age: "5 years old", svgSrc: "foo" },
            { name: "John Foo", age: "5 years old", svgSrc: "foo" },
            { name: "John Foo", age: "5 years old", svgSrc: "foo" },
            { name: "John Foo", age: "5 years old", svgSrc: "foo" },
          ]}
          Element={PetCard}
        />
      </div>
      <div className="bg-row row">
        <img alt={"bg"} src={bgSrc}></img>
      </div>
    </div>
  );
};

export default ProfileCard;
