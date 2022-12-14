import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import service from "@/service";
import { FilterValue } from "@/types";
import { Book } from "@/types";

export const getBooksForResult = createAsyncThunk(
  "GET_BOOKS_FOR_RESULT",
  async ({
    query,
    target = "title",
    size = 10,
    page = 1,
  }: {
    query: string;
    target?: FilterValue;
    size?: number;
    page?: number;
  }) => {
    const { bookService } = service;
    const res = await bookService.get(query, target, size, page);
    return res.data;
  }
);

interface State {
  booksData: {
    documents: Book[];
    meta: { is_end: boolean; pageable_count: number; total_count: number };
  } | null;
  isLoading: boolean;
  isError: boolean;
}
const initialState: State = {
  booksData: null,
  isLoading: false,
  isError: false,
};

const searchResultSlice = createSlice({
  name: "searchResult",
  initialState,
  reducers: {
    clear(state) {
      state.booksData = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBooksForResult.fulfilled, (state, action) => {
      state.booksData = action.payload;
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(getBooksForResult.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(getBooksForResult.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});
export const searchResultActions = searchResultSlice.actions;
export default searchResultSlice.reducer;
