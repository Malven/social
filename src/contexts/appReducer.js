import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  LIKE_SCREAM,
  LOADING_DATA,
  SET_SCREAMS,
  UNLIKE_SCREAM,
  SET_SCREAM,
  DELETE_SCREAM,
  POST_SCREAM
} from './types';
import { initialValue } from './appContext';

export const reducer = (state, action) => {
  switch (action.type) {
    //USER ACTIONS
    case SET_AUTHENTICATED: {
      return { ...state, user: { ...state.user, authenticated: true } };
    }
    case SET_UNAUTHENTICATED: {
      return { ...state, user: initialValue.user };
    }
    case SET_USER:
      return {
        ...state,
        user: { ...action.payload, authenticated: true }
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
        ui: { ...state.ui, errors: action.payload, loading: false },
        data: { ...state.data, loading: false },
        user: { ...state.user, loading: false }
      };
    }
    case CLEAR_ERRORS: {
      return {
        ...state,
        ui: { ...state.ui, errors: {}, loading: false },
        data: { ...state.data, loading: false },
        user: { ...state.user, loading: false }
      };
    }

    //DATA ACTIONS
    case LOADING_DATA: {
      return { ...state, data: { ...state.data, loading: true } };
    }
    case SET_SCREAMS: {
      return {
        ...state,
        data: { ...state.data, screams: action.payload, loading: false }
      };
    }
    case LIKE_SCREAM: {
      updateLikes(state, action);
      return {
        ...state,
        user: {
          ...state.user,
          likes: [
            ...state.user.likes,
            {
              userHandle: state.user.credentials.handle,
              screamId: action.payload.screamId
            }
          ]
        }
      };
    }
    case UNLIKE_SCREAM: {
      updateLikes(state, action);
      return {
        ...state,
        user: {
          ...state.user,
          likes: state.user.likes.filter(
            like => like.screamId !== action.payload.screamId
          )
        }
      };
    }
    case DELETE_SCREAM: {
      return {
        ...state,
        data: {
          ...state.data,
          screams: state.data.screams.filter(s => s.screamId !== action.payload)
        }
      };
    }
    case POST_SCREAM: {
      return {
        ...state,
        data: {
          ...state.data,
          screams: [action.payload, ...state.data.screams]
        }
      };
    }
    default:
      return state;
  }
};

const updateLikes = (state, action) => {
  let index = state.data.screams.findIndex(
    scream => scream.screamId === action.payload.screamId
  );
  state.data.screams[index] = action.payload;
};
