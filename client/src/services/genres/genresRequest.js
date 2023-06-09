import httpRequest from '../../config/api.config';
import {
  deleteGenreFailed,
  deleteGenreStart,
  deleteGenreSuccess,
  getGenresFailed,
  getGenresStart,
  getGenresSuccess,
} from './genresSlice';

export const getGenres = async (accessToken, dispatch) => {
  dispatch(getGenresStart());
  try {
    const res = await httpRequest.get('/genre', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    dispatch(getGenresSuccess(res.data));
    return res.data;
  } catch (err) {
    dispatch(getGenresFailed());
    return false;
  }
};

export const deleteGenre = async (accessToken, genreId, dispatch) => {
  console.log(accessToken, genreId);
  dispatch(deleteGenreStart());
  try {
    await httpRequest.delete(`/genre/${genreId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    dispatch(deleteGenreSuccess(genreId));
    return true;
  } catch (err) {
    dispatch(deleteGenreFailed());
    return false;
  }
};
