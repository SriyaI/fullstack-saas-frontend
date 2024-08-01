import axios from 'axios';
import { REGISTER_SUCCESS, LOGIN_SUCCESS, LOGOUT, GET_PROFILE, GET_PROFILE_ERROR } from './types.js';

export const register = (userData) => async dispatch => {
  try {
    const res = await axios.post('https://secure-saas-service.azurewebsites.net/users/register', userData);
    dispatch({ type: REGISTER_SUCCESS, payload: res.data });
  } catch (err) {
    console.error(err);
  }
};

export const login = (userData) => async dispatch => {
  try {
    const res = await axios.post('https://secure-saas-service.azurewebsites.net/users/login', userData);
    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
  } catch (err) {
    console.error(err);
  }
};

export const getProfile = () => async dispatch => {
    try {
      const res = await axios.get('https://secure-saas-service.azurewebsites.net/users/profile', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming token is stored in localStorage
        },
      });
      dispatch({ type: GET_PROFILE, payload: res.data });
    } catch (err) {
      console.error(err);
      dispatch({ type: GET_PROFILE_ERROR, payload: err.response?.data || err.message });
    }
  };

export const logout = () => {
  return { type: LOGOUT };
};
