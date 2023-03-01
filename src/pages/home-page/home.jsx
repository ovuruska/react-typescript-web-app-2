import { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import Appointments from "../../components/appointments/appointments";
import BookService from "../../components/book-service-card/bookServiceCard";
import PetCard from "../../components/pet-card/petCard";
import SubHeading from "../../components/sub-heading/subHeading";
import useFetchPets from "../../hooks/useFetchPets";

export default function HomePage() {
  const loading = useFetchPets();

  return (
    <Fragment>
      <PetCard loading={loading} />
      <SubHeading title="Upcoming Appointments" />
      <Appointments loading={loading} />
      <Link to="/book" className="book-btn">
        Book
      </Link>
    </Fragment>
  );
}
