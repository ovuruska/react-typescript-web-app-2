import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PetsActions } from "../store/pets-slice";

export default function useFetchPets() {
  const [loading, setloading] = useState(true);

  const dispatch = useDispatch();

  const mockData = [
    {
      name: "Mock",
      breed: "mock",
      age: 5,
      weight: 20,
      description: "mock",
      owner: "mock",
      rabies_vaccination: "mock",
      employee_notes: "mock",
    },
    {
      name: "Mock",
      breed: "mock",
      age: 5,
      weight: 20,
      description: "mock",
      owner: "mock",
      rabies_vaccination: "mock",
      employee_notes: "mock",
    },
  ];

  useEffect(() => {
    ///#TODO API CALL INSTEAD OF SETTIMEOUT WITH MOCKDATA
    dispatch(PetsActions.emptyPets());
    setTimeout(() => {
      mockData.forEach((element) => {
        dispatch(PetsActions.addPet(element));
      });

      setloading(false);
    }, 2000);
  }, []);

  return loading;
}
