import React, { ReactNode, useEffect, useRef, useState } from "react";
import "../../App.css";
import PromotionCard from "../../components/home/promotion-card/promotion-card";
import CarouselSlider from "../../components/carousel-slider/carousel-slider";
import ProfileCard from "../../components/home/profile-card/profile-card";
import ServiceCard from "../../components/home/service-card/service-card";
import svgSrc from "../../assets/grooming.svg";
import "./homepage.css";
import AppointmentCard from "../../components/home/appointment-card/appointment-card";
import imageSrc from "../../assets/mockPhoto.png";
import RewardsCard from "../../components/home/rewards-card/rewards-card";

const HomePage: React.FC = () => {
  useEffect(() => {}, []);

  return (
    <div className="home-page page">
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