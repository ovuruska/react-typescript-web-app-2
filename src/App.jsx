import { Suspense, useState, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import BottomNavBar from "./components/bottom-nav/bottomNav";
import PetCard from "./components/pet-card/petCard";
import HomePage from "./pages/home-page/home";

const Book = lazy(() => import("./pages/book-page/book"));

function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <Routes>
          <Route element={<HomePage />} path="/" />
          <Route
            element={
              <Suspense fallback={<div>#TODO CONTENT LOADER</div>}>
                <Book />
              </Suspense>
            }
            path="/book"
          />
        </Routes>
        <BottomNavBar />
      </div>
    </div>
  );
}

export default App;
