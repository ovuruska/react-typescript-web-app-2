import { Fragment, useEffect } from "react";
import PetCard from "../../components/pet-card/petCard";
import useFetchPets from "../../hooks/useFetchPets";

export default function HomePage() {
  const loading = useFetchPets();

  return (
    <Fragment>
      <PetCard />
    </Fragment>
  );
}
