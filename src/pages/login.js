import React from 'react';
import makeStyles from '@material-ui/styles/makeStyles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import pwImage from '../images/pw.jpg';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../contexts/useAppDispatch';
import { useAppState } from '../contexts/useAppState';

const useStyles = makeStyles(theme => ({ ...theme.classes }));

const Login = props => {
  const classes = useStyles(props);
  const [fields, setFields] = React.useState({
    email: 'user4@email.com',
    password: '123456'
  });
  const { login } = useAppDispatch();
  const { ui } = useAppState();

  const handleOnSubmit = e => {
    e.preventDefault();
    login(fields, props.history);
  };

  const handleChange = e => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <img className={classes.image} src={pwImage} alt="website logo" />
        <Typography variant="h2" className={classes.pageTitle}>
          Login
        </Typography>
        <form noValidate onSubmit={handleOnSubmit}>
          <TextField
            fullWidth
            id="email"
            name="email"
            type="email"
            label="Email"
            className={classes.textField}
            helperText={ui.errors.email}
            error={ui.errors.email ? true : false}
            value={fields.email}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            id="password"
            name="password"
            type="password"
            label="Password"
            className={classes.textField}
            helperText={ui.errors.password}
            error={ui.errors.password ? true : false}
            value={fields.password}
            onChange={handleChange}
          />
          {ui.errors.general && (
            <Typography
              color="error"
              variant="body2"
              className={classes.pageTitle}
            >
              {ui.errors.general}
            </Typography>
          )}
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className={classes.button}
            size="large"
            disabled={ui.loading}
          >
            Login
            {ui.loading && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </Button>
          <br />
          <Typography variant="body1" className={classes.pageTitle}>
            Don't have an account? Sign up <Link to="/signup">here</Link>
          </Typography>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

export default Login;
