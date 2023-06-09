import { createSlice } from '@reduxjs/toolkit';

const bookDetailSlice = createSlice({
  name: 'bookDetail',
  initialState: {
    book: {},
  },
  reducers: {
    getBookByIdStart: (state) => {
      state.isFetching = true;
    },
    getBookByIdSuccess: (state, action) => {
      state.isFetching = false;
      state.book = action.payload.data;
      state.error = false;
    },
    getBookByIdFailed: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const { getBookByIdStart, getBookByIdSuccess, getBookByIdFailed } = bookDetailSlice.actions;

export default bookDetailSlice.reducer;
