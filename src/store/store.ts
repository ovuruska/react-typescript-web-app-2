import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Default: localStorage if web, AsyncStorage if React Native

import petsSlice from "./pet-slice";
import orderSlice from "./order-slice";

const rootReducer = combineReducers({
  pets: petsSlice.reducer,
  order: orderSlice.reducer,
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
});

export type RootState = ReturnType<typeof rootReducer>;

// Export the persisted store and a persistor to use in your application
export const persistor = persistStore(store);
export default store;
