import { makeStyles, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Routes } from '../../shared/constants/routes';

const appTitleStyle = makeStyles(theme => ({
  withDecoration: {
    color: theme.palette.primary.main
  },
  withoutDecoration: {
    textDecoration: 'none',
    color: 'white'
  }
}));

export const AppTitle: React.FunctionComponent = () => {
  const [showUnderline, setShowUnderline] = useState(false);
  const { withoutDecoration, withDecoration } = appTitleStyle();
  return (
    <Typography
      component={Link}
      to={Routes.LANDING}
      variant="h5"
      onMouseEnter={() => setShowUnderline(true)}
      onMouseLeave={() => setShowUnderline(false)}
      className={showUnderline ? withDecoration : withoutDecoration}
    >
      Type Mania
    </Typography>
  );
};
