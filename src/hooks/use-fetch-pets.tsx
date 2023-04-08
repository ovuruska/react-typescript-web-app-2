import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ApiMeResponse from "../interfaces/ApiMeResponse";
import { PetsActions } from "../store/pet-slice";

const useFetchPets = () => {
  const [loading, setloading] = useState<boolean>(true);

  const dispatch = useDispatch();

  function instanceOfApiMeResponse(object: any): object is ApiMeResponse {
    return true;
  }

  async function auth(username: string, password: string) {
    const myHeaders: Headers = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      username,
      password,
    });

    const requestOptions: RequestInit = {
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
      return resp;
    } else {
      return "";
    }
  }

  async function fetchPets() {
    ///Get Pets
    const myHeaders2 = new Headers();
    myHeaders2.append(
      "Authorization",
      `Token ${window.localStorage.getItem("token")}`
    );

    const requestOptions2: RequestInit = {
      method: "GET",
      headers: myHeaders2,
      redirect: "follow",
    };

    const resp2 = await fetch(
      `https://d3v5l9s7gecmms.cloudfront.net/api/me`,
      requestOptions2
    );

    const respBody: ApiMeResponse | { detail: string } = await resp2.json();
    if (!instanceOfApiMeResponse(respBody)) {
      window.localStorage.removeItem("token");
      await authAndFetch();
      return;
    } else {
      respBody.dogs.forEach((pet) => {
        dispatch(PetsActions.addPet(pet));
        setloading(false);
      });
    }
  }

  async function authAndFetch() {
    await auth("aaa", "a");
    await fetchPets();
  }

  useEffect(() => {
    window.localStorage.removeItem("token");
    dispatch(PetsActions.emptyPets());
    authAndFetch();
    console.log("i fire once");
  }, []);

  return loading;
};
export default useFetchPets;
