import httpRequest from '../../config/api.config';
import {
  addGenreFailed,
  addGenreStart,
  addGenreSuccess,
  deleteGenreFailed,
  deleteGenreStart,
  deleteGenreSuccess,
  getGenresFailed,
  getGenresStart,
  getGenresSuccess,
  updateGenreFailed,
  updateGenreStart,
  updateGenreSuccess,
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

export const addGenre = async (accessToken, body, dispatch) => {
  dispatch(addGenreStart());
  try {
    await httpRequest.post('/genre', body, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    dispatch(addGenreSuccess());
    getGenres(accessToken, dispatch);
    return true;
  } catch (err) {
    dispatch(addGenreFailed());
    return false;
  }
};

export const updateGenre = async (accessToken, genreId, body, dispatch) => {
  dispatch(updateGenreStart());
  try {
    await httpRequest.post(`/genre/${genreId}`, body, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    dispatch(updateGenreSuccess());
    getGenres(accessToken, dispatch);
    return true;
  } catch (err) {
    dispatch(updateGenreFailed());
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
