import { createSlice } from '@reduxjs/toolkit';

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState: {
    reviewList: [],
  },
  reducers: {
    getReviewsSuccess: (state, action) => {
      state.reviewList = action.payload.data;
    },
    addReviewSuccess: (state, action) => {
      state.reviewList = [...state.reviewList, action.payload.data];
    },
    updateReviewSuccess: (state, action) => {
      const updatedObj = action.payload;
      state.reviewList = state.reviewList.map((obj) => {
        if (obj.id === updatedObj.id) {
          return updatedObj;
        }
        return obj;
      });
    },
    deleteReviewSuccess: (state, action) => {
      state.reviewList = state.reviewList.filter((obj) => obj.id !== action.payload);
    },
  },
});

export const { getReviewsSuccess, addReviewSuccess, updateReviewSuccess, deleteReviewSuccess } = reviewsSlice.actions;

export default reviewsSlice.reducer;
