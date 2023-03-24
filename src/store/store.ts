import { configureStore } from "@reduxjs/toolkit";
import petsSlice from "./pet-slice";

const store = configureStore({
  reducer: { pets: petsSlice.reducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
