import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import service from "@/service";
import { FilterValue } from "@/types";

export const getBooks = createAsyncThunk(
  "GET_BOOKS",
  async ({
    keyWord,
    filterOption = "title",
    size = 10,
    page = 1,
  }: {
    keyWord: string;
    filterOption?: FilterValue;
    size?: number;
    page?: number;
  }) => {
    const { bookService } = service;
    const res = await bookService.get(keyWord, filterOption, size, page);
    return res.data;
  }
);

type Book = {
  authors: string[];
  contents: string;
  publisher: string;
  thumbnail: string;
  title: string;
  url: string;
  isbn: string;
};

interface State {
  booksData: { documents: Book[]; meta: { is_end: boolean; pageable_count: number } } | null;
  isLoading: boolean;
  isError: boolean;
}
const initialState: State = {
  booksData: null,
  isLoading: false,
  isError: false,
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    clear(state) {
      state.booksData = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBooks.fulfilled, (state, action) => {
      state.booksData = action.payload;
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(getBooks.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(getBooks.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});
export const booksActions = booksSlice.actions;
export default booksSlice.reducer;
