import httpRequest from '../../../config/api.config';
import { getOrderDetailSuccess } from './orderDetailSlice';

export const getOrderDetail = async (accessToken, orderId, dispatch) => {
  try {
    const res = await httpRequest.get(`/order/${orderId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    dispatch(getOrderDetailSuccess(res.data));
    return res.data;
  } catch (err) {
    return false;
  }
};
