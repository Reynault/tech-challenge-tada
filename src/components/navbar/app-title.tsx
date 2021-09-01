import { makeStyles, Typography } from '@material-ui/core';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UrlContext } from '../../contexts/url-context';

const appTitleStyle = makeStyles({
  typography: {
    textDecoration: 'none',
    color: 'white'
  }
});

export const AppTitle: React.FunctionComponent = () => {
  const { landing } = useContext(UrlContext);
  const classes = appTitleStyle();
  return (
    <Typography
      component={Link}
      to={landing}
      variant="h6"
      className={classes.typography}
    >
      Type Mania
    </Typography>
  );
};
