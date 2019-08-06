import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Scream } from '../components/scream';
import { Profile } from '../components/profile';
import { useAppState } from '../contexts/useAppState';
import { useAppDispatch } from '../contexts/useAppDispatch';

export default () => {
  const {
    data: { screams }
  } = useAppState();
  const { getScreams } = useAppDispatch();

  React.useEffect(() => {
    getScreams();
  }, [getScreams]);

  return (
    <Grid container spacing={2}>
      <Grid item sm={8} xs={12}>
        {screams &&
          screams.map(scream => (
            <Scream key={scream.screamId} scream={scream} />
          ))}
      </Grid>
      <Grid item sm={4} xs={12}>
        <Profile />
      </Grid>
    </Grid>
  );
};
