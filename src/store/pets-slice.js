import { createSlice } from "@reduxjs/toolkit";

const petsSlice = createSlice({
  name: "pets",
  initialState: {
    pets: [],
  },
  reducers: {
    addPet(state, action) {
      state.pets.push(action.payload);
    },
    emptyPets(state) {
      state.pets = [];
    },
  },
});

export const PetsActions = petsSlice.actions;

export default petsSlice;
