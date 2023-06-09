import { createSlice } from '@reduxjs/toolkit';

const booksSlice = createSlice({
  name: 'books',
  initialState: {
    bookList: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    getBooksStart: (state) => {
      state.isFetching = true;
    },
    getBooksSuccess: (state, action) => {
      state.isFetching = false;
      state.bookList = action.payload.data;
      state.error = false;
    },
    getBooksFailed: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    deleteBookStart: (state) => {
      state.isFetching = true;
    },
    deleteBookSuccess: (state, action) => {
      state.isFetching = false;
      const deletedBookId = action.payload;
      state.bookList = state.bookList.filter((val) => val.id !== deletedBookId);
      state.error = false;
    },
    deleteBookFailed: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const { getBooksStart, getBooksSuccess, getBooksFailed, deleteBookStart, deleteBookSuccess, deleteBookFailed } =
  booksSlice.actions;

export default booksSlice.reducer;
