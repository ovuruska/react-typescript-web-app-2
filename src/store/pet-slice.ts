import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Pet from "../interfaces/Pet";

export interface PetState {
  pets: Array<Pet>;
}

const initialState: PetState = {
  pets: [],
};

const petsSlice = createSlice({
  name: "pets",
  initialState,
  reducers: {
    addPet(state, action: PayloadAction<Pet>) {
      state.pets.push(action.payload);
    },
    emptyPets(state) {
      state.pets = [];
    },
  },
});

export const PetsActions = petsSlice.actions;

export default petsSlice;
