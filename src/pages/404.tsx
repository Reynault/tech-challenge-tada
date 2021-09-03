import { Button, makeStyles } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import Confused from '../assets/images/confused-meme.gif';
import { LandingAppTitle } from '../components/landing/landing-app-title';
import { Routes } from '../shared/constants/routes';
import { globalStyles } from '../shared/styles/globalStyles';

export const notFoundStyle = makeStyles({
  image: {
    display: 'block',
    maxWidth: '40%',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '80%',
    marginBottom: '15px'
  }
});

export const NotFoundError: React.FunctionComponent = () => {
  const classes = globalStyles();
  const classesNotFound = notFoundStyle();
  return (
    <LandingAppTitle>
      <React.Fragment>
        <h1>404</h1>
        <p>
          Uh Oh, Looks like you lost yourself. Couldn't find the requested page
          !
        </p>
        <img
          className={classesNotFound.image}
          src={Confused}
          alt="loading..."
        />
        <Button
          variant="contained"
          color="primary"
          component={Link}
          className={classes.responsiveButton}
          to={Routes.LANDING}
        >
          Get back home !
        </Button>
      </React.Fragment>
    </LandingAppTitle>
  );
};
