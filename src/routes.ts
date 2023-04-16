import { lazy } from 'react';

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

export const routes = [
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

export const enum RouteNames {
  HOME = "/",
  BOOK = "/book",
  ADDONS = "/add-ons",
  PAYMENT = "/payment",
  POLICY = "/policy",
  THANKS = "/thank-you",
  ADD_PET = "/add-pet",
  MY_ACCOUNT = "/my-account",
  APPOINTMENTS = "/appointments",
  PETS = "/pets",
  PET_DETAILS = "/pet-details",
  LOGIN = "/login",
  FORGOT_PASSWORD = "/forgotpassword",
  SIGNUP = "/signup",
  NOTFOUND = "/404",
}
