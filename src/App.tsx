import React from 'react';
import "./App.css";
import { lazy, Suspense } from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import AutoLogin from "@components/auth/auto-login";
import SpinnerOverlay from "@components/loading/spinner-overlay";

const AddPetPage = lazy(() => import("@pages/add-pet"));
const ThanksPage = lazy(() => import("@pages/thanks"));
const PolicyPage = lazy(() => import("./pages/policy"));
const BookPage = lazy(() => import("./pages/bookpage/bookpage"));
const HomePage = lazy(() => import("./pages/homepage/homepage"));
const AddOnsPage = lazy(() => import("./pages/addons/add-ons"));
const PaymentPage = lazy(() => import("./pages/payment"));
const MyAccountPage = lazy(() => import("./pages/my-account"));
const AppointmentsPage = lazy(() => import("./pages/appointments"));
const PetsPage = lazy(() => import("./pages/pets"));
const PetDetailsPage = lazy(() => import("./pages/pet-details"));
const ForgotPasswordPage = lazy(() => import('./pages/forgot-password'));
const SignUpPage = lazy(() => import('./pages/sign-up'));
const LoginPage = lazy(() => import('@pages/login'));
const NotFoundPage = lazy(() => import('@pages/error-page'));

const routes = [
  { path: "/", component: HomePage },
  { path: "/book", component: BookPage },
  { path: "/add-ons", component: AddOnsPage },
  { path: "/payment", component: PaymentPage },
  { path: "/policy", component: PolicyPage },
  { path: "/thank-you", component: ThanksPage },
  { path: "/add-pet", component: AddPetPage },
  { path: "/my-account", component: MyAccountPage },
  { path: "/appointments", component: AppointmentsPage },
  { path: "/pets", component: PetsPage },
  { path: "/pet-details", component: PetDetailsPage },
  { path: "/login", component: LoginPage, noAutoLogin: true },
  { path: "/forgotpassword", component: ForgotPasswordPage, noAutoLogin: true },
  { path: "/signup", component: SignUpPage, noAutoLogin: true },
  { path: "*", component: NotFoundPage,noAutoLogin: true },
];

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
