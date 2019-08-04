import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAppState } from '../contexts/useAppState';

export const AuthRoute = ({ component: Component, ...rest }) => {
  const { user } = useAppState();

  return (
    <Route
      {...rest}
      render={props =>
        user.authenticated ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};
