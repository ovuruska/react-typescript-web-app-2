import { PetDetailsEntity } from '@domain/types/common/pet-details';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface SelectedPetState {
  pet?: PetDetailsEntity | null;
};

const initialState: SelectedPetState = {
  pet: null,
}

const selectedPetSlice = createSlice({
  name: "selectedPet",
  initialState,
  reducers: {
    setPet: (state, action: PayloadAction<PetDetailsEntity>) => {
      state.pet = action.payload;
    }
  }
});

export const SelectedPetActions = selectedPetSlice.actions;

export default selectedPetSlice;
