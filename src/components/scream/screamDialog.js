import React from 'react';
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
import { CommentForm } from './commentForm';

const useStyles = makeStyles(theme => ({
  ...theme.classes,
  profileImage: {
    maxWidth: 200,
    height: 200,
    objectFit: 'cover',
    borderRadius: '50%'
  },
  dialogContent: {
    padding: 20
  },
  closeButton: {
    position: 'absolute',
    left: '90%',
    top: '4%'
  },
  expandButton: {
    position: 'absolute',
    left: '90%'
  },
  spinnerDiv: {
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 50
  }
}));

export const ScreamDialog = ({ screamId, userHandle, openDialog }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [paths, setPaths] = React.useState({
    newPath: '',
    oldPath: ''
  });

  const { getScream, clearErrors } = useAppDispatch();
  const {
    data: { scream },
    ui: { loading }
  } = useAppState();

  const handleOpen = React.useCallback(() => {
    let oldPath = window.location.pathname;
    const newPath = `/users/${userHandle}/${screamId}`;
    if (oldPath === newPath) {
      oldPath = `/users/${userHandle}`;
    }

    window.history.pushState(null, null, newPath);
    setPaths({ oldPath, newPath });

    setOpen(true);
    getScream(screamId);
  }, [getScream, screamId, userHandle]);

  const handleClose = () => {
    window.history.pushState(null, null, paths.oldPath);
    setOpen(false);
    clearErrors();
  };

  React.useEffect(() => {
    if (openDialog) {
      handleOpen();
    }
  }, [handleOpen, openDialog]);

  const dialogMarkup = loading ? (
    <div className={classes.spinnerDiv}>
      <CircularProgress size={200} thickness={2} />
    </div>
  ) : (
    <Grid container spacing={2}>
      <Grid item sm={5}>
        <img
          src={scream.userImageUrl}
          alt="profile"
          className={classes.profileImage}
        />
      </Grid>
      <Grid item sm={7}>
        <Typography
          component={Link}
          color="primary"
          variant="h5"
          to={`/users/${userHandle}`}
        >
          @{userHandle}
        </Typography>
        <hr className={classes.invisibleSeparator} />
        <Typography variant="body2" color="textSecondary">
          {dayjs(scream.createdAt).format('HH:mm DD MMMM YYYY')}
        </Typography>
        <hr className={classes.invisibleSeparator} />
        <Typography variant="body1">{scream.body}</Typography>
        <hr className={classes.invisibleSeparator} />
        <LikeButton screamId={scream.screamId} />
        <span>{scream.likeCount} Likes</span>
        <TooltipButton tip="comments">
          <ChatIcon color="primary" />
        </TooltipButton>
        <span>{scream.commentCount} Comments</span>
      </Grid>
      <hr className={classes.visibleSeparator} />
      <CommentForm screamId={scream.screamId} />
      <Comments comments={scream.comments} />
    </Grid>
  );

  return (
    <>
      <TooltipButton
        tip="Expand post"
        tooltipClass={classes.expandButton}
        onClick={handleOpen}
      >
        <UnfoldMoreIcon color="primary" />
      </TooltipButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <TooltipButton
          tip="Close"
          onClick={handleClose}
          tooltipClass={classes.closeButton}
        >
          <CloseIcon />
        </TooltipButton>
        <DialogContent className={classes.dialogContent}>
          {dialogMarkup}
        </DialogContent>
      </Dialog>
    </>
  );
};
