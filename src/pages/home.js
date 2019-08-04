import React from 'react';
import Grid from '@material-ui/core/Grid';

import axios from 'axios';
import { Scream } from '../components/scream';

export default () => {
  const [screams, setScreams] = React.useState([]);

  React.useEffect(() => {
    let ignore = false;

    const fetchScreams = async () => {
      try {
        const screams = await axios.get('/screams');

        if (!ignore) {
          setScreams(screams.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchScreams();

    return () => (ignore = true);
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item sm={8} xs={12}>
        {screams &&
          screams.map(scream => (
            <Scream key={scream.screamId} scream={scream} />
          ))}
      </Grid>
      <Grid item sm={4} xs={12}>
        <p>Profile</p>
      </Grid>
    </Grid>
  );
};
