import { createSlice } from '@reduxjs/toolkit';

const genresSlice = createSlice({
  name: 'genres',
  initialState: {
    genreList: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    getGenresStart: (state) => {
      state.isFetching = true;
    },
    getGenresSuccess: (state, action) => {
      state.isFetching = false;
      state.genreList = action.payload.data;
      state.error = false;
    },
    getGenresFailed: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    addGenreStart: (state) => {
      state.isFetching = true;
    },
    addGenreSuccess: (state) => {
      state.isFetching = false;
      state.error = false;
    },
    addGenreFailed: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    updateGenreStart: (state) => {
      state.isFetching = true;
    },
    updateGenreSuccess: (state) => {
      state.isFetching = false;
      state.error = false;
    },
    updateGenreFailed: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    deleteGenreStart: (state) => {
      state.isFetching = true;
    },
    deleteGenreSuccess: (state, action) => {
      state.isFetching = false;

      const deletedGenreId = action.payload;
      state.genreList = state.genreList.filter((val) => val.id !== deletedGenreId);

      state.error = false;
    },
    deleteGenreFailed: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getGenresStart,
  getGenresSuccess,
  getGenresFailed,
  addGenreStart,
  addGenreSuccess,
  addGenreFailed,
  updateGenreStart,
  updateGenreSuccess,
  updateGenreFailed,
  deleteGenreStart,
  deleteGenreSuccess,
  deleteGenreFailed,
} = genresSlice.actions;

export default genresSlice.reducer;
