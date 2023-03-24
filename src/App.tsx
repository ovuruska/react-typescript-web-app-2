import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import useFetchPets from "./hooks/useFetchPets";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import "./App.css";
import HomePage from "./pages/homepage";

function App() {
  /* const [count, setCount] = useState(0);
  const loading: Boolean = useFetchPets();

  const pets = useSelector((state: RootState) => {
    return state.pets.pets;
  });

  useEffect(() => {
    (pets);
  }, [loading]); */

  return (
    <div className="App">
      <HomePage />
    </div>
  );
}

export default App;
