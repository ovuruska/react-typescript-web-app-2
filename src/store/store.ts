import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { createLogger } from "redux-logger";

import storage from "redux-persist/lib/storage"; // Default: localStorage if web, AsyncStorage if React Native
import petsSlice from "./pet-slice";
import orderSlice from "./order-slice";
import selectedPetSlice from '@quicker/store/selected-pet-slice';

const rootReducer = combineReducers({
  pets: petsSlice.reducer,
  order: orderSlice.reducer,
  selectedPet: selectedPetSlice.reducer,
});
const logger = createLogger({
  // options...
  collapsed: true,

});

const persistConfig = {
  key: "root",
  storage,
  // Optionally, add a list of reducers to blacklist or whitelist
  // blacklist: [], // List of reducers NOT to be persisted
  // whitelist: [], // List of reducers to be persisted
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),

});

export type RootState = ReturnType<typeof rootReducer>;

// Export the persisted store and a persistor to use in your application
export const persistor = persistStore(store);
export default store;
