import React from 'react';
import "./App.css";
import { lazy, Suspense } from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import AutoLogin from "@components/auth/auto-login";
import SpinnerOverlay from "@components/loading/spinner-overlay";

import { routes } from "./routes";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {routes.map(({ path, component: Component, noAutoLogin }) => (
            <Route
              key={path}
              path={path}
              element={
                <Suspense fallback={<SpinnerOverlay />}>
                  {noAutoLogin ? (
                    <Component />
                  ) : (
                    <AutoLogin>
                      <Component />
                    </AutoLogin>
                  )}
                </Suspense>
              }
            />
          ))}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
