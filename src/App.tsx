
import "./App.css";
import { lazy, Suspense } from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import AutoLogin from "@components/auth/auto-login";
import SpinnerOverlay from "@components/loading/spinner-overlay";
import AddOnsPage from '@pages/addons/add-ons';

const BookPage = lazy(() => import("./pages/bookpage/bookpage"));
const HomePage = lazy(() => import("./pages/homepage/homepage"));

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<SpinnerOverlay />}>
                <AutoLogin>
                  <HomePage />
                </AutoLogin>
              </Suspense>
            }
          />
          <Route
            path="/book"
            element={
              <Suspense fallback={<SpinnerOverlay />}>
                <AutoLogin>
                  <BookPage />
                </AutoLogin>
              </Suspense>
            }
          />
          <Route
            path="/add-ons"
            element={
              <Suspense fallback={<SpinnerOverlay />}>

              <AutoLogin>
                <AddOnsPage />
              </AutoLogin>
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
