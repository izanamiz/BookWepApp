import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../services/auth/authSlice';
import booksReducer from '../services/books/booksSlice';
import genresReducer from '../services/genres/genresSlice';
import bookDetailReducer from '../services/books/bookDetailSlice';
import reviewsReducer from '../services/user/reviews/reviewsSlice';
import cartReducer from '../services/user/cart/cartSlice';
import orderReducer from '../services/user/order/orderSlice';
import orderDetailReducer from '../services/user/order/orderDetailSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  books: booksReducer,
  genres: genresReducer,
  bookDetail: bookDetailReducer,
  reviews: reviewsReducer,
  cart: cartReducer,
  order: orderReducer,
  orderDetail: orderDetailReducer,
});

export default rootReducer;
