import React from 'react';
import makeStyles from '@material-ui/styles/makeStyles';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useAppState } from '../../contexts/useAppState';
import { useAppDispatch } from '../../contexts/useAppDispatch';
import { TooltipButton } from '../../utils/tooltipButton';

const useStyles = makeStyles(theme => ({
  ...theme.classes,
  button: {
    float: 'right'
  }
}));

export const EditDetails = props => {
  const classes = useStyles(props);
  const { user } = useAppState();
  const { credentials } = user;
  const { editUserDetails } = useAppDispatch();
  const [state, setState] = React.useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      bio: credentials.bio ? credentials.bio : '',
      website: credentials.website ? credentials.website : '',
      location: credentials.location ? credentials.location : '',
      open: false
    }
  );

  const handleOpen = () => {
    setState({ open: true });
  };

  const handleClose = () => {
    setState({ open: false });
  };

  const handleOnChange = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    editUserDetails({
      bio: state.bio,
      website: state.website,
      location: state.location
    });
    handleClose();
  };

  return (
    <>
      <TooltipButton
        tip="Edit details"
        onClick={handleOpen}
        iconButtonClass={classes.button}
      >
        <EditIcon color="primary" />
      </TooltipButton>
      <Dialog open={state.open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Edit your details</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              name="bio"
              type="text"
              label="Bio"
              multiline
              rows="3"
              placeholder="A short bio abour yourself"
              className={classes.textField}
              value={state.bio}
              onChange={handleOnChange}
              fullWidth
            />
            <TextField
              name="website"
              type="text"
              label="Website"
              placeholder="Your personal website"
              className={classes.textField}
              value={state.website}
              onChange={handleOnChange}
              fullWidth
            />
            <TextField
              name="location"
              type="text"
              label="Location"
              placeholder="Where you live"
              className={classes.textField}
              value={state.location}
              onChange={handleOnChange}
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
