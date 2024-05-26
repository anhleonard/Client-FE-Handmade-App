import { configureStore } from "@reduxjs/toolkit";
import loadingSlice from "./slices/loadingSlice";
import alertSlice from "./slices/alertSlice";
import refetchSlice from "./slices/refetchSlice";
import storeSlice from "./slices/storeSlice";
import orderSlice from "./slices/orderSlice";

export const store = configureStore({
  reducer: {
    loading: loadingSlice,
    alert: alertSlice,
    refetch: refetchSlice,
    store: storeSlice,
    order: orderSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
