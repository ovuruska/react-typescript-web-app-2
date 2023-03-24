import React, { ReactNode, useEffect, useRef, useState } from "react";
import "../App.css";
import ProfileCard from "../components/profile-card/profile-card";
import PromotionCard from "../components/promotion-card/promotion-card";
import ServiceCard from "../components/service-card/service-card";
import svgSrc from "../assets/grooming.svg";
import "./homepage.css";
import AppointmentCard from "../components/appointment-card/appointment-card";
import CarouselSlider from "../components/carousel-slider/carousel-slider";
import imageSrc from "../assets/mockPhoto.png";
import RewardsCard from "../components/rewards-card/rewards-card";

const HomePage: React.FC = () => {
  useEffect(() => {
    console.log(imageSrc);
  }, []);

  return (
    <div className="home-page">
      <ProfileCard />
      <RewardsCard rewardCount={100} />
      <div className="service-row">
        <ServiceCard
          title="Grooming"
          subtitle="Tincidunt ornare massa"
          svgSrc={svgSrc}
        />
        <ServiceCard
          title="WeWash"
          subtitle="Tincidunt ornare massa"
          svgSrc={svgSrc}
        />
      </div>
      <div className="appointments-row">
        <div className="header-row">
          <h2>Upcoming Appointments</h2>
        </div>
        <AppointmentCard
          name="Emma"
          location="Royal Oak Pet Grooming"
          date="Mar. 23"
          time="9:30 Saturday"
        />
        <AppointmentCard
          name="Emma"
          location="Royal Oak Pet Grooming"
          date="Mar. 23"
          time="9:30 Saturday"
        />
        <AppointmentCard
          name="Emma"
          location="Royal Oak Pet Grooming"
          date="Mar. 23"
          time="9:30 Saturday"
        />
      </div>
      <div className="promotions-row">
        <div className="header-row" style={{ paddingLeft: "0" }}>
          <h2>Promotions</h2>
        </div>
        <CarouselSlider
          Element={PromotionCard}
          args={[
            { title: "Maecenas lacus vel facilisis", imageSrc: imageSrc },
            { title: "Maecenas lacus vel facilisis", imageSrc: imageSrc },
            { title: "Maecenas lacus vel facilisis", imageSrc: imageSrc },
          ]}
        />
      </div>
    </div>
  );
};

export default HomePage;
