import React from 'react';
import { AppUpdaterContext } from './appContext';
import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  LOADING_DATA,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  SET_SCREAMS,
  SET_SCREAM,
  DELETE_SCREAM,
  POST_SCREAM
} from './types';
import axios from 'axios';

export const useAppDispatch = () => {
  const dispatch = React.useContext(AppUpdaterContext);

  if (!dispatch) {
    throw new Error('useAppDispatch context must be provided');
  }

  //SCREAM FUNCTIONS
  const getScreams = React.useCallback(async () => {
    dispatch({ type: LOADING_DATA });
    try {
      const result = await axios.get('/screams');
      dispatch({ type: SET_SCREAMS, payload: result.data });
      dispatch({ type: CLEAR_ERRORS });
    } catch (error) {
      dispatch({ type: SET_ERRORS, payload: error.response.data });
      dispatch({ type: SET_SCREAMS, payload: [] });
    }
  }, [dispatch]);

  const setScream = React.useCallback(async () => {
    dispatch({ type: LOADING_DATA });
    try {
    } catch (error) {
      dispatch({ type: SET_ERRORS, payload: error.response.data });
    }
  }, [dispatch]);

  const likeScream = React.useCallback(
    async screamId => {
      dispatch({ type: LOADING_DATA });
      try {
        const result = await axios.get(`/scream/${screamId}/like`);
        dispatch({ type: LIKE_SCREAM, payload: result.data });
        dispatch({ type: CLEAR_ERRORS });
      } catch (error) {
        dispatch({ type: SET_ERRORS, payload: error.response.data });
      }
    },
    [dispatch]
  );

  const unlikeScream = React.useCallback(
    async screamId => {
      dispatch({ type: LOADING_DATA });
      try {
        const result = await axios.get(`/scream/${screamId}/unlike`);
        dispatch({ type: UNLIKE_SCREAM, payload: result.data });
        dispatch({ type: CLEAR_ERRORS });
      } catch (error) {
        dispatch({ type: SET_ERRORS, payload: error.response.data });
      }
    },
    [dispatch]
  );

  const deleteScream = React.useCallback(
    async screamId => {
      try {
        await axios.delete(`/scream/${screamId}`);
        dispatch({ type: DELETE_SCREAM, payload: screamId });
        dispatch({ type: CLEAR_ERRORS });
      } catch (error) {
        dispatch({ type: SET_ERRORS, payload: error.response.data });
      }
    },
    [dispatch]
  );

  const postScream = React.useCallback(
    async scream => {
      dispatch({ type: LOADING_UI });
      try {
        const result = await axios.post('/scream', scream);
        dispatch({ type: POST_SCREAM, payload: result.data });
        dispatch({ type: CLEAR_ERRORS });
      } catch (error) {
        dispatch({ type: SET_ERRORS, payload: error.response.data });
      }
    },
    [dispatch]
  );

  //USER FUNCTIONS

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
        dispatch({ type: CLEAR_ERRORS });
      } catch (error) {
        dispatch({ type: SET_ERRORS, payload: error.response.data });
      }
    },
    [dispatch, getUser]
  );

  const editUserDetails = React.useCallback(
    async userDetails => {
      dispatch({ type: LOADING_USER });
      try {
        await axios.post('/user', userDetails);
        getUser();
      } catch (error) {
        dispatch({ type: SET_ERRORS, payload: error.response.data });
      }
    },
    [dispatch, getUser]
  );

  const clearErrors = React.useCallback(() => {
    dispatch({ type: CLEAR_ERRORS });
  }, [dispatch]);

  return {
    getUser,
    login,
    signup,
    logout,
    uploadImage,
    editUserDetails,
    getScreams,
    likeScream,
    unlikeScream,
    setScream,
    deleteScream,
    postScream,
    clearErrors
  };
};

const setAuthorizationHeader = token => {
  localStorage.setItem('social-token', token);
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};
