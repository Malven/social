import React from 'react';
import { AppStateContext } from './appContext';

export const useAppState = () => {
  const context = React.useContext(AppStateContext);

  if (!context) {
    throw new Error('useAppState context must be provided');
  }

  return context;
};
