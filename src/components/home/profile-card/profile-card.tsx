import "./profile-card.css";
import "../../../App.css";
import React from "react";
import PetCard from "../../home/pet-card/pet-card";
import bgSrc from "../../../assets/bgtop.png";
import CarouselSlider from "../../carousel-slider/carousel-slider";
import ProfileBtn from "../../buttons/profile-btn";
import AddBtn from "../../buttons/add-btn";
import scrubbersLogo from "../../../assets/scrubbers-logo.png";
interface Props {}

const ProfileCard: React.FC<Props> = ({}) => {
  return (
    <div className="profile">
      <div className="row row1">
        <img width={"128px"} src={scrubbersLogo}/>
        <div className="icons">
          <ProfileBtn />
          <AddBtn />
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
        <img src={bgSrc}></img>
      </div>
    </div>
  );
};

export default ProfileCard;
