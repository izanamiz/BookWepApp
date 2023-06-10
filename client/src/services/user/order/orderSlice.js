import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orderList: [],
  },
  reducers: {
    getOrderSuccess: (state, action) => {
      state.orderList = action.payload.data;
    },
    addOrderSuccess: (state, action) => {
      state.orderList = [...state.orderList, action.payload.data];
    },
    cancelOrderSuccess: (state, action) => {
      //   state.orderList = state.orderList.filter((obj) => obj.id !== action.payload);
    },
  },
});

export const { getOrderSuccess, addOrderSuccess, cancelOrderSuccess } = orderSlice.actions;

export default orderSlice.reducer;
