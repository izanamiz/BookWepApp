import httpRequest from '../../config/api.config';
import {
  addBookSuccess,
  deleteBookFailed,
  deleteBookStart,
  deleteBookSuccess,
  getBooksFailed,
  getBooksStart,
  getBooksSuccess,
  updateBookSuccess,
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

export const addBook = async (accessToken, body, dispatch) => {
  try {
    const res = await httpRequest.post('/book', body, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    dispatch(addBookSuccess(res.data));
    getBooks(accessToken, dispatch);
    return true;
  } catch (err) {
    return false;
  }
};
export const updateBook = async (accessToken, bookId, body, dispatch) => {
  try {
    const res = await httpRequest.post(`/book/${bookId}`, body, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    dispatch(updateBookSuccess(res.data));
    getBooks(accessToken, dispatch);
    return true;
  } catch (err) {
    return false;
  }
};
