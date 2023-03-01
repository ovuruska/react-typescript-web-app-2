import { createSlice } from "@reduxjs/toolkit";

const petsSlice = createSlice({
  name: "pets",
  initialState: {
    pets: [],
    id: 102,
  },
  reducers: {
    addPet(state, action) {
      state.pets.push(action.payload);
    },
    emptyPets(state) {
      state.pets = [];
    },
    setId(state, action) {
      state.id = action.payload;
    },
  },
});

export const PetsActions = petsSlice.actions;

export default petsSlice;
