import httpRequest from '../../config/api.config';

import { getBookByIdFailed, getBookByIdStart, getBookByIdSuccess } from './bookDetailSlice';

export const getBookById = async (accessToken, bookId, dispatch) => {
  dispatch(getBookByIdStart());
  try {
    const res = await httpRequest.get(`/book/${bookId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    dispatch(getBookByIdSuccess(res.data));
    return res.data;
  } catch (err) {
    dispatch(getBookByIdFailed());
    return false;
  }
};
