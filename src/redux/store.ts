import { configureStore } from "@reduxjs/toolkit";
import loadingSlice from "./slices/loadingSlice";
import alertSlice from "./slices/alertSlice";

export const store = configureStore({
  reducer: {
    loading: loadingSlice,
    alert: alertSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
