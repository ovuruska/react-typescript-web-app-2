import { createSlice } from "@reduxjs/toolkit";

class Pet {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
}

const petsSlice = createSlice({
  name: "pets",
  initialState: {
    pets: [],
  },
  reducers: {
    addPet(state, action) {
      state.pets.push(Pet());
    },
  },
});

export const PetsActions = petsSlice.actions;

export default petsSlice;
