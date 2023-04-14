import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PetEntity } from '@domain/types/common/pet';
import { PetMockGenerator } from '@domain/types/__mock__/pet-generator';

export interface PetState {
  pets: Array<PetEntity>;
}

const petGenerator = new PetMockGenerator();

const initialState: PetState = {
  pets: petGenerator.generateMany(2)
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
