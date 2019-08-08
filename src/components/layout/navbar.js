import React from 'react';
//MUI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';
import NotificationsIcon from '@material-ui/icons/Notifications';
//Router
import { Link } from 'react-router-dom';
import { useAppState } from '../../contexts/useAppState';

import { TooltipButton } from '../../utils/tooltipButton';
import { PostScream } from '../scream/postScream';

export const Navbar = () => {
  const { user } = useAppState();

  return (
    <AppBar>
      <Toolbar className="nav-container">
        {!user.authenticated ? (
          <>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/signup">
              Signup
            </Button>
          </>
        ) : (
          <>
            <Link to="/">
              <TooltipButton tip="Home">
                <HomeIcon />
              </TooltipButton>
            </Link>
            <PostScream />
            <TooltipButton tip="Notifications">
              <NotificationsIcon />
            </TooltipButton>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};
