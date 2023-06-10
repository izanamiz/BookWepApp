import httpRequest from '../../../config/api.config';
import { getCart } from '../cart/cartRequest';
import { addOrderSuccess,  cancelOrderSuccess,  getOrderSuccess} from './orderSlice';

export const getOrder = async (accessToken, dispatch) => {
  try {
    const res = await httpRequest.get('/order', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    dispatch(getOrderSuccess(res.data));
    return res.data;
  } catch (err) {
    return false;
  }
};

export const addOrder = async (accessToken, body, dispatch) => {
  try {
    const res = await httpRequest.post('/order', body, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    dispatch(addOrderSuccess(res.data));
    getCart(accessToken, dispatch);
    return true;
  } catch (err) {
    return false;
  }
};

export const cancelOrder = async (accessToken, orderId, body, dispatch) => {
  try {
    const res = await httpRequest.post(`/order/${orderId}`, body, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(res.data)
    getOrder(accessToken, dispatch);
    return true;
  } catch (err) {
    return false;
  }
};
