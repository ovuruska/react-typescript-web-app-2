import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import BottomNavBar from "./components/bottom-nav/bottomNav";
import PetCard from "./components/pet-card/petCard";
import HomePage from "./pages/home-page/home";

function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <Routes>
          <Route element={<HomePage />} path="/" />
        </Routes>
        <BottomNavBar />
      </div>
    </div>
  );
}

export default App;
