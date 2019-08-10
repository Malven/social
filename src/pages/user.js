import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import { TooltipButton } from '../utils/tooltipButton';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/styles/makeStyles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';

import { useAppDispatch } from '../contexts/useAppDispatch';
import { useAppState } from '../contexts/useAppState';
import { DialogContent } from '@material-ui/core';
import { Scream } from '../components/scream/scream';
import { StaticProfile } from '../components/profile/staticProfile';

const useStyles = makeStyles(theme => ({
  ...theme.classes
}));

const UserPage = ({ match }) => {
  const classes = useStyles();
  const { getUserData } = useAppDispatch();
  const {
    data: { screams, loading }
  } = useAppState();
  const handle = match.params.handle;
  const screamId = match.params.screamId;
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    let ignore = false;
    const fetchUserData = async () => {
      getUserData(handle);
      try {
        const result = await axios.get(`/user/${handle}`);
        if (!ignore) setUser(result.data.user);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();

    return () => (ignore = true);
  }, [getUserData, handle]);

  return (
    <Grid container spacing={2}>
      <Grid item sm={8} xs={12}>
        {loading ? (
          <p>Loading...</p>
        ) : screams === null ? (
          <p>No screams from this user</p>
        ) : !screamId ? (
          screams.map(scream => (
            <Scream key={scream.screamId} scream={scream} />
          ))
        ) : (
          screams.map(scream => {
            if (scream.screamId !== screamId) {
              return <Scream key={scream.screamId} scream={scream} />;
            } else {
              return (
                <Scream key={scream.screamId} scream={scream} openDialog />
              );
            }
          })
        )}
      </Grid>
      <Grid item sm={4} xs={12}>
        {user ? <StaticProfile profile={user} /> : <p>Loading...</p>}
      </Grid>
    </Grid>
  );
};

export default UserPage;
