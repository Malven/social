import React from 'react';
import { reducer } from './appReducer';

export const AppUpdaterContext = React.createContext();
export const AppStateContext = React.createContext();

const AppProvider = ({ children, initialValue }) => {
  const [state, dispatch] = React.useReducer(reducer, initialValue);

  return (
    <AppUpdaterContext.Provider value={dispatch}>
      <AppStateContext.Provider value={state}>
        {children}
      </AppStateContext.Provider>
    </AppUpdaterContext.Provider>
  );
};

AppProvider.defaultProps = {
  initialValue: {
    user: {},
    data: { test: 'testdata' },
    ui: {}
  }
};

export default AppProvider;