import { configureStore } from "@reduxjs/toolkit";

import booksSliceReducer from "./booksSlice";

const store = configureStore({
  reducer: { books: booksSliceReducer },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;
