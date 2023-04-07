import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface OrderState {
  orderType: string;
  branch?:number;
  groomer?:number;
  start?:string;

}

const initialState: OrderState = {
  orderType: "Grooming",

};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrderType: (state, action: PayloadAction<string>) => {
      state.orderType = action.payload;
    },
    setBranch: (state, action: PayloadAction<number>) => {
      state.branch = action.payload;
    },
    setOrder: (state, action: PayloadAction<Partial<OrderState>>) => {
      state.orderType = action.payload.orderType ?? state.orderType;
      state.branch = action.payload.branch ?? state.branch;
      state.groomer = action.payload.groomer ?? state.groomer;

    },
    setGroomers: (state, action: PayloadAction<number>) => {
      state.groomer = action.payload;
    },
    resetOrder: (state) => {
      state.orderType = initialState.orderType;
      state.branch = initialState.branch;
      state.groomer = initialState.groomer;
    },
  },
});

export const OrderActions = orderSlice.actions;

export default orderSlice;
