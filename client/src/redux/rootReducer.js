import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../services/auth/authSlice"
import booksReducer from "../services/books/booksSlice"
import genresReducer from "../services/genres/genresSlice"

const rootReducer = combineReducers({
  auth: authReducer,
  books: booksReducer,
  genres: genresReducer,
});

export default rootReducer;
