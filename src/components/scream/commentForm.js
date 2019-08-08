import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import CloseIcon from '@material-ui/icons/Close';
import ChatIcon from '@material-ui/icons/Chat';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import { TooltipButton } from '../../utils/tooltipButton';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/styles/makeStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { useAppDispatch } from '../../contexts/useAppDispatch';
import { useAppState } from '../../contexts/useAppState';
import { LikeButton } from './likeButton';
import { Comments } from './comments';

const useStyles = makeStyles(theme => ({
  ...theme.classes,
  submitButton: {
    position: 'relative',
    float: 'right'
  },
  progressSpinner: {
    position: 'absolute'
  }
}));

export const CommentForm = ({ screamId }) => {
  const [body, setBody] = React.useState('');
  const { postComment } = useAppDispatch();
  const { user, ui, data } = useAppState();

  const classes = useStyles();

  const handleChange = e => {
    setBody(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    postComment(screamId, { body });
    setBody('');
  };

  return user.authenticated ? (
    <Grid item sm={12} style={{ textAlign: 'center' }}>
      <form onSubmit={handleSubmit}>
        <TextField
          name="body"
          type="text"
          label="Comment"
          error={ui.errors.comment ? true : false}
          helperText={ui.errors.comment}
          value={body}
          onChange={handleChange}
          fullWidth
          className={classes.textField}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={data.loading}
          className={classes.submitButton}
        >
          Submit
          {data.loading ? (
            <CircularProgress size={30} className={classes.progressSpinner} />
          ) : null}
        </Button>
      </form>
    </Grid>
  ) : null;
};
