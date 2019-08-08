import React from 'react';
import { TooltipButton } from '../../utils/tooltipButton';
import { Link } from 'react-router-dom';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { useAppDispatch } from '../../contexts/useAppDispatch';
import { useAppState } from '../../contexts/useAppState';

export const LikeButton = ({ screamId }) => {
  const { likeScream, unlikeScream } = useAppDispatch();
  const { user } = useAppState();

  const likedScream = () => {
    if (user.likes && user.likes.find(like => like.screamId === screamId)) {
      return true;
    }
    return false;
  };

  const likeAScream = () => {
    likeScream(screamId);
  };

  const unlikeAScream = () => {
    unlikeScream(screamId);
  };

  return !user.authenticated ? (
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
};
