import React from 'react';
import { TooltipButton } from '../../utils/tooltipButton';
import makeStyles from '@material-ui/styles/makeStyles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { useAppDispatch } from '../../contexts/useAppDispatch';

const useStyles = makeStyles({
  deleteButton: {
    position: 'absolute',
    left: '90%',
    top: '10%'
  }
});

export const DeleteScream = ({ screamId }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const { deleteScream } = useAppDispatch();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteAScream = () => {
    deleteScream(screamId);
    setOpen(false);
  };

  return (
    <>
      <TooltipButton
        tip="Delete post"
        onClick={handleOpen}
        iconButtonClass={classes.deleteButton}
      >
        <DeleteOutlineIcon color="error" />
      </TooltipButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Are you sure you want to delete the post?</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="inherit">
            Cancel
          </Button>
          <Button onClick={deleteAScream} variant="contained" color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
