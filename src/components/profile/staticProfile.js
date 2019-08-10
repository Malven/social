import React from 'react';
import makeStyles from '@material-ui/styles/makeStyles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';
import EditIcon from '@material-ui/icons/Edit';
import CalendarToday from '@material-ui/icons/CalendarToday';
import { Link } from 'react-router-dom';
import { useAppState } from '../../contexts/useAppState';
import { useAppDispatch } from '../../contexts/useAppDispatch';
import { EditDetails } from './editDetails';
import dayjs from 'dayjs';
import { TooltipButton } from '../../utils/tooltipButton';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: 20
  },
  profile: {
    '& .image-wrapper': {
      textAlign: 'center',
      position: 'relative'
    },
    '& .profile-image': {
      width: 200,
      height: 200,
      objectFit: 'cover',
      maxWidth: '100%',
      borderRadius: '50%'
    },
    '& .profile-details': {
      textAlign: 'center',
      '& span, svg': {
        verticalAlign: 'middle'
      },
      '& a': {
        color: theme.palette.primary.main
      }
    },
    '& hr': {
      border: 'none',
      margin: '0 0 10px 0'
    }
  }
}));

export const StaticProfile = ({ profile }) => {
  const classes = useStyles();
  const { handle, createdAt, imageUrl, bio, website, location } = profile;

  let profileMarkup = (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className="image-wrapper">
          <img className="profile-image" src={imageUrl} alt="profile" />
        </div>
        <hr />
        <div className="profile-details">
          <MuiLink
            component={Link}
            to={`/users/${handle}`}
            color="primary"
            variant="h5"
          >
            @{handle}
          </MuiLink>
          <hr />
          {bio && <Typography variant="body2">{bio}</Typography>}
          <hr />
          {location && (
            <>
              <LocationOn color="primary" /> <span>{location}</span>
              <hr />
            </>
          )}
          {website && (
            <>
              <LinkIcon color="primary" />
              <a target="_blank" rel="noopener noreferrer" href={website}>
                {' '}
                {website}
              </a>
            </>
          )}
          <hr />
          <CalendarToday color="primary"> </CalendarToday>{' '}
          <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
        </div>
      </div>
    </Paper>
  );

  return profileMarkup;
};
