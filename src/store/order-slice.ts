import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Pet from "../interfaces/Pet";

export interface OrderState {
  orderType: string;
}

const initialState: OrderState = {
  orderType: "Grooming",
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrderType(state, action) {
      state.orderType = action.payload;
    },
  },
});

export const OrderActions = orderSlice.actions;

export default orderSlice;