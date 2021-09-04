import { Button, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import Confused from '../assets/images/confused-meme.gif';
import { LandingAppTitle } from '../components/landing/landing-app-title';
import { Routes } from '../shared/constants/routes';
import { globalStyles } from '../shared/styles/globalStyles';

export const notFoundStyle = makeStyles({
  image: {
    display: 'block',
    maxWidth: '30%',
    minWidth: '150px',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '80%',
    marginBottom: '15px'
  }
});

export const NotFoundError: React.FunctionComponent = () => {
  const { responsiveButton } = globalStyles();
  const { image } = notFoundStyle();
  return (
    <LandingAppTitle>
      <>
        <Typography variant="h2">404</Typography>
        <Typography variant="subtitle1">
          Uh Oh, Looks like you lost yourself. Couldn't find the requested page
          !
        </Typography>
        <img className={image} src={Confused} alt="loading..." />
        <Button
          variant="contained"
          color="primary"
          component={Link}
          className={responsiveButton}
          to={Routes.LANDING}
        >
          Get back home !
        </Button>
      </>
    </LandingAppTitle>
  );
};
