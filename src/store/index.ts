import { configureStore } from "@reduxjs/toolkit";

import { basketSlice } from "./basket";
import { currentItem } from "./currentItem";

export const store = configureStore({
  reducer: {
    basket: basketSlice.reducer,
    currentItem: currentItem.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
