import { configureStore } from "@reduxjs/toolkit";

import { whitelabelSlice } from "./whitelabel";

import { basketSlice } from "./basket";

export const store = configureStore({
  reducer: {
    basket: basketSlice.reducer,
    whitelabel: whitelabelSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
