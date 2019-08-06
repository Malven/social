import React from 'react';
import makeStyles from '@material-ui/styles/makeStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import ChatIcon from '@material-ui/icons/Chat';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useAppDispatch } from '../contexts/useAppDispatch';
import { useAppState } from '../contexts/useAppState';
import { TooltipButton } from '../utils/tooltipButton';
import { DeleteScream } from './deleteScream';

dayjs.extend(relativeTime);

const useStyles = makeStyles({
  card: {
    position: 'relative',
    display: 'flex',
    marginBottom: 20
  },
  content: {
    padding: 25,
    objectFit: 'cover'
  },
  image: {
    minWidth: 200
  }
});

export const Scream = ({ scream, ...restProps }) => {
  const classes = useStyles(restProps);
  const {
    body,
    createdAt,
    userImageUrl,
    userHandle,
    screamId,
    likeCount,
    commentCount
  } = scream;

  const { likeScream, unlikeScream } = useAppDispatch();
  const { user } = useAppState();

  const likedScream = () => {
    if (user.likes && user.likes.find(like => like.screamId === screamId)) {
      return true;
    }
    return false;
  };

  const likeAScream = () => {
    likeScream(scream.screamId);
  };

  const unlikeAScream = () => {
    unlikeScream(scream.screamId);
  };

  const likeButton = !user.authenticated ? (
    <TooltipButton tip="Like">
      <Link to="/login">
        <FavoriteBorderIcon color="primary" />
      </Link>
    </TooltipButton>
  ) : likedScream() ? (
    <TooltipButton tip="Unlike" onClick={unlikeAScream}>
      <FavoriteIcon color="primary" />
    </TooltipButton>
  ) : (
    <TooltipButton tip="Like" onClick={likeAScream}>
      <FavoriteBorderIcon color="primary" />
    </TooltipButton>
  );

  const deleteButton =
    user.authenticated && userHandle === user.credentials.handle ? (
      <DeleteScream screamId={screamId} />
    ) : null;

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.image}
        image={userImageUrl}
        title="Profile"
      />
      <CardContent className={classes.content}>
        <Typography
          variant="h5"
          component={Link}
          to={`/users/${userHandle}`}
          color="primary"
        >
          {userHandle}
        </Typography>
        {deleteButton}
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).fromNow()}
        </Typography>
        <Typography variant="body1">{body}</Typography>
        {likeButton}
        <span>{likeCount} Likes</span>
        <TooltipButton tip="comments">
          <ChatIcon color="primary" />
        </TooltipButton>
        <span>{commentCount} Comments</span>
      </CardContent>
    </Card>
  );
};
