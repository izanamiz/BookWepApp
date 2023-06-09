import httpRequest from '../../config/api.config';
import { addReviewSuccess, deleteReviewSuccess, getReviewsSuccess, updateReviewSuccess } from './reviewsSlice';

export const getAllReviews = async (accessToken, dispatch) => {
  try {
    const res = await httpRequest.get('/review', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    dispatch(getReviewsSuccess(res.data));
    return res.data;
  } catch (err) {
    return false;
  }
};

export const addReview = async (accessToken, body, dispatch) => {
  console.log(body);
  try {
    const res = await httpRequest.post('/review', body, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    dispatch(addReviewSuccess(res.data));
    return true;
  } catch (err) {
    return false;
  }
};

export const updateReview = async (accessToken, reviewId, body, dispatch) => {
  try {
    const res = await httpRequest.post(`/review/${reviewId}`, body, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    dispatch(updateReviewSuccess(res.data));
    return true;
  } catch (err) {
    return false;
  }
};

export const deleteReview = async (accessToken, reviewId, dispatch) => {
  try {
    await httpRequest.delete(`/review/${reviewId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    dispatch(deleteReviewSuccess(reviewId));
    return true;
  } catch (err) {
    return false;
  }
};
