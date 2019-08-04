import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER
} from './types';
import { initialValue } from './appContext';

export const reducer = (state, action) => {
  switch (action.type) {
    //USER ACTIONS
    case SET_AUTHENTICATED: {
      return { ...state, user: { ...state.user, authenticated: true } };
    }
    case SET_UNAUTHENTICATED: {
      return initialValue;
    }
    case SET_USER:
      return {
        ...state,
        user: { ...action.payload, authenticated: true, loading: false }
      };
    case LOADING_USER:
      return { ...state, user: { ...state.user, loading: true } };
    //UI ACTIONS
    case LOADING_UI: {
      return { ...state, ui: { ...state.ui, loading: true } };
    }
    case SET_ERRORS: {
      return {
        ...state,
        ui: { ...state.ui, errors: action.payload, loading: false }
      };
    }
    case CLEAR_ERRORS: {
      return { ...state, ui: { ...state.ui, errors: {}, loading: false } };
    }
    default:
      return state;
  }
};
