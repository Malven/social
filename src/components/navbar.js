import React from 'react';
//MUI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
//Router
import { Link } from 'react-router-dom';
import { useAppState } from '../contexts/useAppState';
import { useAppDispatch } from '../contexts/useAppDispatch';

export const Navbar = () => {
  const { user } = useAppState();
  const { logout } = useAppDispatch();

  return (
    <AppBar>
      <Toolbar className="nav-container">
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        {!user.authenticated && (
          <>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/signup">
              Signup
            </Button>
          </>
        )}
        {user.authenticated && (
          <Button color="inherit" component={Link} to="/" onClick={logout}>
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};
