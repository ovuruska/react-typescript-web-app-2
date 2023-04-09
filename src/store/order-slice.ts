import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BranchEntity } from '@domain/types/common/branch';
import { EmployeeEntity } from '@domain/types/common/employee';
import { PetEntity } from '@domain/types/common/pet';

export interface OrderState {
  orderType: string;
  branch?:BranchEntity;
  groomer?:EmployeeEntity;
  pet?:PetEntity;
  products?:number[];
  start?:string;
}

const initialState: OrderState = {
  orderType: "Grooming",
  products:[],

};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
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
    },
    setPet: (state, action: PayloadAction<PetEntity>) => {
      console.log(action);
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

    },
  },

});

export const OrderActions = orderSlice.actions;

export default orderSlice;
