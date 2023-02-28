import { Fragment, useEffect } from "react";
import BookService from "../../components/book-service-card/bookServiceCard";
import PetCard from "../../components/pet-card/petCard";
import SubHeading from "../../components/sub-heading/subHeading";
import useFetchPets from "../../hooks/useFetchPets";

export default function HomePage() {
  const loading = useFetchPets();

  return (
    <Fragment>
      <PetCard />
      <SubHeading title="Book a Service" />
      <BookService />
    </Fragment>
  );
}
