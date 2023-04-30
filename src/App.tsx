import React, { useEffect } from 'react';
import "./App.css";
import { lazy, Suspense } from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import SpinnerOverlay from "@components/loading/spinner-overlay";

import { routes } from "./routes";
import { PublicRoute } from '@components/auth/public-route';
import { PrivateRoute } from '@components/auth/private-route';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {routes.map(({ path, component: Component,publicRoute }) => (
            <Route
              key={path}
              path={path}
              element={
                <Suspense fallback={<SpinnerOverlay />}>
                  {publicRoute ? (
                    <PublicRoute>
                      <Component />
                    </PublicRoute>
                  ) : (
                    <PrivateRoute>
                      <Component />
                    </PrivateRoute>
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
