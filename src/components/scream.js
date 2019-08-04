import React from 'react';
import makeStyles from '@material-ui/styles/makeStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const useStyles = makeStyles({
  card: {
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
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).fromNow()}
        </Typography>
        <Typography variant="body1">{body}</Typography>
      </CardContent>
    </Card>
  );
};
