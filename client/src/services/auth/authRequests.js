import httpRequest from '../../config/api.config';
import {
  loginFailed,
  loginStart,
  loginSuccess,
  logoutFailed,
  logoutStart,
  logoutSuccess,
  registerFailed,
  registerStart,
  registerSuccess,
} from './authSlice';

export const loginUser = async (credientials, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await httpRequest.post('/auth/login', credientials);
    dispatch(loginSuccess(res.data));
    return true;
  } catch (err) {
    dispatch(loginFailed());
    return false;
  }
};

export const registerUser = async (credientials, dispatch) => {
  console.log(credientials)
  dispatch(registerStart());
  try {
    await httpRequest.post('/auth/register', credientials);
    dispatch(registerSuccess());
    return true;
  } catch (err) {
    dispatch(registerFailed());
    return false;
  }
};

export const logOut = async (dispatch) => {
  dispatch(logoutStart());
  try {
    dispatch(logoutSuccess());
    return true;
  } catch (err) {
    dispatch(logoutFailed());
    return false;
  }
};
