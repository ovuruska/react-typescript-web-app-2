import { configureStore } from "@reduxjs/toolkit";
import petsSlice from "./pets-slice";

const store = configureStore({
  reducer: { pets: petsSlice.reducer },
});

export default store;
