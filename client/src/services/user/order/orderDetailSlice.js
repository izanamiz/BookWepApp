import { createSlice } from '@reduxjs/toolkit';

const orderDetailSlice = createSlice({
  name: 'orderDetail',
  initialState: {
    orderDetailList: [],
  },
  reducers: {
    getOrderDetailSuccess: (state, action) => {
      state.orderDetailList = action.payload.data;
    },
  },
});

export const { getOrderDetailSuccess } = orderDetailSlice.actions;

export default orderDetailSlice.reducer;
