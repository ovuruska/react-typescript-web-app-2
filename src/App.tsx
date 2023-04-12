
import React, { LazyExoticComponent } from 'react';
import './App.css';
import { lazy, Suspense } from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AutoLogin from '@components/auth/auto-login';
import SpinnerOverlay from '@components/loading/spinner-overlay';

const PolicyPage = lazy(() => import('./pages/policy'));
const BookPage = lazy(() => import('./pages/bookpage/bookpage'));
const HomePage = lazy(() => import('./pages/homepage/homepage'));
const AddOnsPage = lazy(() => import('./pages/addons/add-ons'));
const PaymentPage = lazy(() => import('./pages/payment'));
const LoginPage = lazy(() => import('./pages/login/login'));
const ThanksPage = lazy(() => import('./pages/thanks'));
const AddPetPage = lazy(() => import("@pages/add-pet"));

const appConfig: any[] = [
  '/',
  HomePage,
  '/book',
  BookPage,
  '/add-ons',
  AddOnsPage,
  '/payment',
  PaymentPage,
];

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
          <Route
            path="/payment"
            element={
              <Suspense fallback={<SpinnerOverlay />}>
                <AutoLogin>
                  <PaymentPage />
                </AutoLogin>
              </Suspense>
            }
          />
          <Route
            path="/policy"
            element={
              <Suspense fallback={<SpinnerOverlay />}>
                <AutoLogin>
                  <PolicyPage />
                </AutoLogin>
              </Suspense>
            }
          />
          <Route
            path={'/thank-you'}
            element={
              <Suspense fallback={<SpinnerOverlay />}>
                <AutoLogin>
                  <ThanksPage />
                </AutoLogin>
              </Suspense>

            }
          />
          <Route
            path="/login"
            element={
              <Suspense fallback={<SpinnerOverlay />}>
                <LoginPage />
              </Suspense>
            }
          />
          <Route
            path={"/add-pet"}
            element={
              <Suspense fallback={<SpinnerOverlay />}>
                <AutoLogin>
                  <AddPetPage />
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
