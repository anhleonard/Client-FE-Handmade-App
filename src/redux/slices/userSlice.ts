import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type UserState = {
  token: string | null;
};

const initialState: UserState = {
  token: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    removeUser: (state) => {
      state.token = null;
    },
    addUser: (state, action: PayloadAction<UserState>) => {
      state.token = action.payload.token;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
