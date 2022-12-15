import { configureStore } from "@reduxjs/toolkit";

import booksSliceReducer from "./booksSlice";
import searchResultReducer from "./searchResultSlice";
const store = configureStore({
  reducer: { books: booksSliceReducer, searchResult: searchResultReducer },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;
