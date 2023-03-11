import { useEffect, useState } from "react";
import { flushSync } from "react-dom";
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
          "https://d3v5l9s7gecmms.cloudfront.net/api/auth/customer/login",
          requestOptions
        )
      ).json();
      console.log(resp);
      window.localStorage.setItem("token", resp.token);
      dispatch(PetsActions.setId(resp.profile.id));
    } else {
      console.log(window.localStorage.getItem("token"));
    }

    ///Get Pets
    var myHeaders2 = new Headers();
    myHeaders2.append(
      "Authorization",
      "Token a3c4fbcde633ba8d9d9f344177f7e6935535dde2d8afbf8d815d59fbea8c3e5e"
    );

    var requestOptions2 = {
      method: "GET",
      headers: myHeaders2,
      redirect: "follow",
    };

    const resp2 = await fetch(
      `https://d3v5l9s7gecmms.cloudfront.net/api/me`,
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
    window.localStorage.removeItem("token", false);
    authAndFetch();
  }, []);

  return loading;
}
