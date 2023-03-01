import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PetsActions } from "../store/pets-slice";

export default function useFetchPets() {
  const [loading, setloading] = useState(true);

  const id = useSelector((state) => {
    return state.pets.id;
  });

  const dispatch = useDispatch();

  async function authAndFetch() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      username: "aaa",
      password: "a",
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    ///Auth and get token
    if (!window.localStorage.getItem("token")) {
      const resp = await (
        await fetch(
          "http://54.85.253.78:80/api/auth/customer/login",
          requestOptions
        )
      ).json();
      window.localStorage.setItem("token", resp.token);
      dispatch(PetsActions.setId(resp.profile.id));
    }

    ///Get Pets
    var myHeaders2 = new Headers();
    myHeaders2.append(
      "Authorization",
      `Token ${window.localStorage.getItem("token")}`
    );

    var requestOptions2 = {
      method: "GET",
      headers: myHeaders2,
      redirect: "follow",
    };
    const resp2 = await fetch(
      `http://54.85.253.78:80/api/scheduling/customer/${id}`,
      requestOptions2
    );

    const respBody = await resp2.json();
    if (respBody.dogs.length > 0) {
      respBody.dogs.forEach((pet) => {
        dispatch(PetsActions.addPet(pet));
        setloading(false);
      });
    }
  }

  useEffect(() => {
    dispatch(PetsActions.emptyPets());
    authAndFetch();
  }, []);

  return loading;
}
