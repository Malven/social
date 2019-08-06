import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import { TooltipButton } from '../utils/tooltipButton';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import makeStyles from '@material-ui/styles/makeStyles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';

import { useAppDispatch } from '../contexts/useAppDispatch';
import { useAppState } from '../contexts/useAppState';
import { DialogContent } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  ...theme.classes,
  submitButton: {
    position: 'relative',
    float: 'right'
  },
  progressSpinner: {
    position: 'absolute'
  },
  closeButton: {
    position: 'absolute',
    left: '90%',
    top: '3%'
  },
  content: {
    padding: '0 24px 24px 24px'
  }
}));

export const PostScream = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [body, setBody] = React.useState('');

  const { postScream, clearErrors } = useAppDispatch();
  const { ui } = useAppState();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setBody('');
  };

  const handleSubmit = e => {
    e.preventDefault();
    postScream({
      body
    });
  };

  const handleChange = e => {
    setBody(e.target.value);
  };

  React.useEffect(() => {
    if (!ui.errors.body && !ui.loading) {
      handleClose();
    }
  }, [ui.errors, ui.loading]);

  React.useEffect(() => {
    if (!ui.loading && !open && ui.errors.body) {
      clearErrors();
    }
  }, [clearErrors, open, ui.errors.body, ui.loading]);

  return (
    <>
      <TooltipButton tip="Add a new post" onClick={handleOpen}>
        <AddIcon />
      </TooltipButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <TooltipButton
          tip="Close"
          onClick={handleClose}
          tooltipClass={classes.closeButton}
        >
          <CloseIcon />
        </TooltipButton>
        <DialogTitle>Post a new scream</DialogTitle>
        <DialogContent className={classes.content}>
          <form onSubmit={handleSubmit}>
            <TextField
              name="body"
              type="text"
              label="Scream"
              multiline
              rows="3"
              placeholder="Add some content"
              error={ui.errors.body ? true : false}
              helperText={ui.errors.body}
              className={classes.textField}
              onChange={handleChange}
              fullWidth
              value={body}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submitButton}
              disabled={ui.loading}
            >
              Post
              {ui.loading ? (
                <CircularProgress
                  size={30}
                  className={classes.progressSpinner}
                />
              ) : null}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
