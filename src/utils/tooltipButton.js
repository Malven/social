import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import PropTypes from 'prop-types';

export const TooltipButton = ({
  children,
  tip,
  tooltipClass,
  iconButtonClass,
  onClick
}) => (
  <Tooltip title={tip} className={tooltipClass}>
    <IconButton onClick={onClick} className={iconButtonClass}>
      {children}
    </IconButton>
  </Tooltip>
);

TooltipButton.propTypes = {
  tip: PropTypes.string,
  tooltipClass: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  iconButtonClass: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onClick: PropTypes.func
};

TooltipButton.defaultProps = {
  tip: 'Tooltip',
  tooltipClass: {},
  iconButtonClass: {},
  onClick: () => {}
};
