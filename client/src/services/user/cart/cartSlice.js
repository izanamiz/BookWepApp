import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartList: [],
  },
  reducers: {
    getCartSuccess: (state, action) => {
      state.cartList = action.payload.data;
    },
    addCartSuccess: (state, action) => {
      state.cartList = [...state.cartList, action.payload.data];
    },
    updateCartSuccess: (state, action) => {
      const updatedObj = action.payload.data;
      state.cartList = state.cartList.map((obj) => {
        if (obj.id === updatedObj.id) {
          return updatedObj;
        }
        return obj;
      });
    },
    deleteCartSuccess: (state, action) => {
      state.cartList = state.cartList.filter((obj) => obj.id !== action.payload);
    },
  },
});

export const { getCartSuccess, addCartSuccess, updateCartSuccess, deleteCartSuccess } = cartSlice.actions;

export default cartSlice.reducer;
