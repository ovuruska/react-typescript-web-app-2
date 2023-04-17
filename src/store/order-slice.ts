import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BranchEntity } from '@domain/types/common/branch';
import { EmployeeEntity } from '@domain/types/common/employee';
import { PetEntity } from '@domain/types/common/pet';

export interface OrderState {
  orderType: string;
  branch?:BranchEntity;
  groomer?:EmployeeEntity;
  pet?:PetEntity;
  products:number[];
  start?:string;
  step:number;
}

const initialState: OrderState = {
  orderType: "Grooming",
  products:[],
  step:0

};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    incrementStep: (state) => {
      state.step = state.step + 1;
    },
    decrementStep: (state) => {
      state.step = state.step - 1;
    },
    setOrderType: (state, action: PayloadAction<string>) => {
      state.orderType = action.payload;
    },
    setBranch: (state, action: PayloadAction<BranchEntity>) => {
      state.branch = action.payload;
    },
    setOrder: (state, action: PayloadAction<Partial<OrderState>>) => {
      state.orderType = action.payload.orderType ?? state.orderType;
      state.branch = action.payload.branch ?? state.branch;
      state.groomer = action.payload.groomer ?? state.groomer;
      state.pet = action.payload.pet ?? state.pet;
      state.start = action.payload.start ?? state.start;
      state.step = action.payload.step ?? state.step;
      state.products = action.payload.products ?? state.products.filter((p) => p != 0) ?? [];
    },
    setPet: (state, action: PayloadAction<PetEntity>) => {
      console.log("setPet", action.payload);
      state.pet = action.payload;
    },
    setGroomers: (state, action: PayloadAction<EmployeeEntity>) => {
      state.groomer = action.payload;
    },
    resetOrder: (state) => {
      state.orderType = initialState.orderType;
      state.branch = initialState.branch;
      state.groomer = initialState.groomer;
      state.pet = initialState.pet;
      state.start = initialState.start;
      state.products = initialState.products;
      state.step = 0;
    },
  },

});

export const OrderActions = orderSlice.actions;

export default orderSlice;
