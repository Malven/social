import React from 'react';
import { AppUpdaterContext } from './appContext';

export const useAppDispatch = () => {
  const dispatch = React.useContext(AppUpdaterContext);

  if (!dispatch) {
    throw new Error('useAppDispatch context must be provided');
  }

  return dispatch;
};
