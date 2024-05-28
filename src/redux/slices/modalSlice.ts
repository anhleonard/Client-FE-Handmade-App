import { ModalState } from "@/enum/defined-types";
import { SCREEN } from "@/enum/setting";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: ModalState = {
  isOpen: false,
  title: "Modal title",
  content: "",
  className: "max-w-5xl",
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    closeModal: (state) => {
      state.isOpen = false;
      state.title = "";
      state.content = "";
      state.className = "max-w-5xl";
    },
    openModal: (state, action: PayloadAction<ModalState>) => {
      state.isOpen = true;
      state.title = action.payload.title;
      state.content = action.payload.content;
      state.className = action.payload.className
        ? action.payload.className
        : "max-w-5xl";
    },
  },
});

// Action creators are generated for each case reducer function
export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
