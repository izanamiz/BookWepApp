import httpRequest from '../../config/api.config';
import {
  deleteBookFailed,
  deleteBookStart,
  deleteBookSuccess,
  getBooksFailed,
  getBooksStart,
  getBooksSuccess,
} from './booksSlice';

export const getBooks = async (accessToken, dispatch) => {
  dispatch(getBooksStart());
  try {
    const res = await httpRequest.get('/book', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    dispatch(getBooksSuccess(res.data));
    return res.data;
  } catch (err) {
    dispatch(getBooksFailed());
    return false;
  }
};


export const deleteBook = async (accessToken, bookId, dispatch) => {
  console.log(accessToken, bookId);
  dispatch(deleteBookStart());
  try {
    await httpRequest.delete(`/book/${bookId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    dispatch(deleteBookSuccess(bookId));
    return true;
  } catch (err) {
    dispatch(deleteBookFailed());
    return false;
  }
};
