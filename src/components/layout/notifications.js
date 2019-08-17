import React from 'react';
import NotificationsIcon from '@material-ui/icons/Notifications';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import { useAppState } from '../../contexts/useAppState';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useAppDispatch } from '../../contexts/useAppDispatch';

dayjs.extend(relativeTime);

export const Notifications = () => {
  const {
    user: { notifications }
  } = useAppState();
  const { markNotificationsRead } = useAppDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleOpen = e => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onMenuOpened = () => {
    let unreadNotificationsIds = notifications
      .filter(n => !n.read)
      .map(n => n.notificationId);
    markNotificationsRead(unreadNotificationsIds);
  };

  let notificationIcon;
  if (notifications && notifications.length > 0) {
    const unRead = notifications.filter(n => !n.read);
    if (unRead.length > 0) {
      notificationIcon = (
        <Badge badgeContent={unRead.length} color="secondary">
          <NotificationsIcon />
        </Badge>
      );
    } else {
      notificationIcon = <NotificationsIcon />;
    }
  } else {
    notificationIcon = <NotificationsIcon />;
  }

  let notificationsMarkup =
    notifications && notifications.length > 0 ? (
      notifications.map(n => {
        const verb = n.type === 'like' ? 'liked' : 'commented on';
        const time = dayjs(n.createdAt).fromNow();
        const iconColor = n.read ? 'primary' : 'secondary';
        const icon =
          n.type === 'like' ? (
            <FavoriteIcon color={iconColor} style={{ marginRight: 10 }} />
          ) : (
            <ChatIcon color={iconColor} style={{ marginRight: 10 }} />
          );

        return (
          <MenuItem key={n.createdAt} onClick={handleClose}>
            {icon}
            <Typography
              component={Link}
              color="inherit"
              variant="body2"
              to={`/users/${n.recipient}/scream/${n.screamId}`}
            >
              {n.sender} {verb} your scream {time}
            </Typography>
          </MenuItem>
        );
      })
    ) : (
      <MenuItem onClick={handleClose}>You have no notifications yet</MenuItem>
    );

  return (
    <>
      <Tooltip title="Notifications">
        <IconButton
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={handleOpen}
        >
          {notificationIcon}
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onEntered={onMenuOpened}
      >
        {notificationsMarkup}
      </Menu>
    </>
  );
};
