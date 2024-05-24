import { StoreState } from "@/enum/defined-types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: StoreState = {
  store: null,
};

export const storeSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    removeStore: (state) => {
      state.store = null;
    },
    addStore: (state, action: PayloadAction<StoreState>) => {
      state.store = action.payload.store;
    },
  },
});

// Action creators are generated for each case reducer function
export const { removeStore, addStore } = storeSlice.actions;

export default storeSlice.reducer;
