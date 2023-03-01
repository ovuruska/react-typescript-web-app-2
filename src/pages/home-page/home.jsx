import { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import Appointments from "../../components/appointments/appointments";
import BookService from "../../components/book-service-card/bookServiceCard";
import PetCard from "../../components/pet-card/petCard";
import SubHeading from "../../components/sub-heading/subHeading";
import useFetchPets from "../../hooks/useFetchPets";
import HomeContentLoader from "./home-content-loader.jsx";

export default function HomePage() {
  const loading = useFetchPets();

  if (loading)
    return (
      <Fragment>
        <HomeContentLoader />
      </Fragment>
    );

  return (
    <Fragment>
      <PetCard />
      <SubHeading title="Upcoming Appointments" />
      <Appointments />
      <Link to="/book" className="book-btn">
        Book
      </Link>
    </Fragment>
  );
}
