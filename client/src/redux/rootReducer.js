import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../services/auth/authSlice"
import booksReducer from "../services/books/booksSlice"
import genresReducer from "../services/genres/genresSlice"
import bookDetailReducer from "../services/books/bookDetailSlice"
import reviewsReducer from "../services/reviews/reviewsSlice"

const rootReducer = combineReducers({
  auth: authReducer,
  books: booksReducer,
  genres: genresReducer,
  bookDetail: bookDetailReducer,
  reviews: reviewsReducer
});

export default rootReducer;
