import React from 'react';
import { reducer } from './appReducer';

export const AppUpdaterContext = React.createContext();
export const AppStateContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialValue);

  return (
    <AppUpdaterContext.Provider value={dispatch}>
      <AppStateContext.Provider value={state}>
        {children}
      </AppStateContext.Provider>
    </AppUpdaterContext.Provider>
  );
};

export const initialValue = {
  user: {
    authenticated: false,
    credentials: {},
    likes: [],
    notifications: [],
    loading:false
  },
  data: {},
  ui: { errors: {}, loading: false }
};

export default AppProvider;
