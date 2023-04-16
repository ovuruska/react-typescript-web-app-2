import React, { useEffect } from "react";
import "../../App.css";
import PromotionCard from "@components/cards/promotion-card/promotion-card";
import CarouselSlider from "@components/carousel-slider/carousel-slider";
import ProfileCard from "@components/cards/profile-card/profile-card";
import ServiceCard from "@components/cards/service-card/service-card";
import svgSrc from "../../assets/grooming.svg";
import "./homepage.scss";
import AppointmentCard from "@components/cards/appointment-card/appointment-card";
import imageSrc from "../../assets/mockPhoto.png";
import logoSrc from "../../assets/logo.png";
import { PetEntity } from '@domain/types/common/pet';
import { AppointmentEntity } from '@domain/types/common/appointment';
import UpcomingApptsDumb from '@features/upcoming-appts/index.dumb';

export interface HomePageDumbProps {
  appointments: AppointmentEntity[];
  pets: PetEntity[];
}

const HomePageDumb = ({appointments,pets} : HomePageDumbProps) => {

  return (
    <div className="home-page page">
      <img  alt="scrubbers logo" className={"logo"} src={logoSrc}></img>
      <ProfileCard pets={pets}/>
      {/* <RewardsCard rewardCount={100} /> */}
      <div className="service-row">
        <div className="header-row">
          <h1>Book Appointment</h1>
        </div>
        <div className="service-row-flex">
          <ServiceCard
            title="Grooming"
            subtitle="Tincidunt ornare massa"
            svgSrc={svgSrc}
          />
          <ServiceCard
            title="We Wash"
            subtitle="Tincidunt ornare massa"
            svgSrc={svgSrc}
          />
        </div>
      </div>
      <div className="appointments-row">
        <UpcomingApptsDumb appointments={appointments} />
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
}

export default HomePageDumb
