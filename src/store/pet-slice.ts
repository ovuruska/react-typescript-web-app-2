import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PetEntity } from '@domain/types/common/pet';

export interface PetState {
  pets: Array<PetEntity>;
}

const initialState: PetState = {
  pets: [
    {
      id: 5,
      created_at: "String",
      updated_at: "String",
      name: "Archie",
      breed: "String",
      age: 5,
      weight: 10,
      description: "String",
      rabies_vaccination: "String",
      employee_notes: "String",
      customer_notes: "String",
      special_handling: false,
      coat_type: "String",
      owner: 5,
    },
    {
      id: 5,
      created_at: "String",
      updated_at: "String",
      name: "Leslie",
      breed: "String",
      age: 5,
      weight: 10,
      description: "String",
      rabies_vaccination: "String",
      employee_notes: "String",
      customer_notes: "String",
      special_handling: false,
      coat_type: "String",
      owner: 5,
    },
  ],
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
