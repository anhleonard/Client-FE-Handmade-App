import { OrderState, StoreState } from "@/enum/defined-types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: OrderState = {
  shippingAddressId: 0,
  orderedProductIds: [],
  deliveryFee: 0,
  isPaid: false,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    removeOrder: (state) => {
      state.shippingAddressId = 0;
      state.orderedProductIds = [];
      state.deliveryFee = 0;
      state.isPaid = false;
    },
    addOrder: (state, action: PayloadAction<OrderState>) => {
      state.shippingAddressId = action.payload.shippingAddressId;
      state.orderedProductIds = action.payload.orderedProductIds;
      state.deliveryFee = action.payload.deliveryFee;
      state.isPaid = action.payload.isPaid;
    },
  },
});

// Action creators are generated for each case reducer function
export const { removeOrder, addOrder } = orderSlice.actions;

export default orderSlice.reducer;
