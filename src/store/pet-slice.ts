import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PetEntity } from '@domain/types/common/pet';

export interface PetState {
  pets: Array<PetEntity>;
}

const initialState: PetState = {
  pets: []
};

const petsSlice = createSlice({
  name: "pets",
  initialState,
  reducers: {
    addPet(state, action: PayloadAction<PetEntity>) {
      state.pets.push(action.payload);
    },
    emptyPets(state) {
      state.pets = [];
    },
  },
});

export const PetsActions = petsSlice.actions;

export default petsSlice;
