import httpRequest from '../../../config/api.config';
import { addCartSuccess, deleteCartSuccess, getCartSuccess, updateCartSuccess } from './cartSlice';

export const getCart = async (accessToken, dispatch) => {
  try {
    const res = await httpRequest.get('/cart', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    dispatch(getCartSuccess(res.data));
    return res.data;
  } catch (err) {
    return false;
  }
};

export const addCart = async (accessToken, body, dispatch) => {
  try {
    const res = await httpRequest.post('/cart', body, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    dispatch(addCartSuccess(res.data));
    return true;
  } catch (err) {
    return false;
  }
};

export const updateCart = async (accessToken, cartId, body, dispatch) => {
  try {
    const res = await httpRequest.post(`/cart/${cartId}`, body, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    dispatch(updateCartSuccess(res.data));
    return true;
  } catch (err) {
    return false;
  }
};

export const deleteCart = async (accessToken, cartId, dispatch) => {
  try {
    await httpRequest.delete(`/cart/${cartId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    dispatch(deleteCartSuccess(cartId));
    return true;
  } catch (err) {
    return false;
  }
};
