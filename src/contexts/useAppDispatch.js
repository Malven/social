import React from 'react';
import { AppUpdaterContext } from './appContext';
import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  LOADING_USER
} from './types';
import axios from 'axios';

export const useAppDispatch = () => {
  const dispatch = React.useContext(AppUpdaterContext);

  if (!dispatch) {
    throw new Error('useAppDispatch context must be provided');
  }

  const getUser = React.useCallback(async () => {
    dispatch({ type: LOADING_USER });
    try {
      dispatch({ type: LOADING_UI });
      const result = await axios.get('/user');
      dispatch({ type: SET_USER, payload: result.data });
      dispatch({ type: CLEAR_ERRORS });
    } catch (error) {
      dispatch({ type: SET_ERRORS, payload: error.response.data });
    }
  }, [dispatch]);

  const login = React.useCallback(
    async (userData, history) => {
      dispatch({ type: LOADING_UI });

      try {
        const result = await axios.post('/login', userData);
        setAuthorizationHeader(result.data.token);
        getUser();
        dispatch({ type: CLEAR_ERRORS });
        history.push('/');
      } catch (error) {
        dispatch({ type: SET_ERRORS, payload: error.response.data });
      }
    },
    [dispatch, getUser]
  );

  const logout = React.useCallback(() => {
    localStorage.removeItem('social-token');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({ type: SET_UNAUTHENTICATED });
  }, [dispatch]);

  const signup = React.useCallback(
    async (newUserData, history) => {
      dispatch({ type: LOADING_UI });

      try {
        const result = await axios.post('/signup', newUserData);
        setAuthorizationHeader(result.data.token);
        getUser();
        dispatch({ type: CLEAR_ERRORS });
        history.push('/');
      } catch (error) {
        dispatch({ type: SET_ERRORS, payload: error.response.data });
      }
    },
    [dispatch, getUser]
  );

  const uploadImage = React.useCallback(
    async formData => {
      dispatch({ type: LOADING_USER });
      try {
        await axios.post('/user/image', formData);
        getUser();
      } catch (error) {
        dispatch({ type: SET_ERRORS, payload: error.response.data });
      }
    },
    [dispatch, getUser]
  );

  return { getUser, login, signup, logout, uploadImage };
};

const setAuthorizationHeader = token => {
  localStorage.setItem('social-token', token);
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};
