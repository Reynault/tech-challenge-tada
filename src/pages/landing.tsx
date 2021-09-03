import { Button, makeStyles } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import { LandingAppTitle } from '../components/landing/landing-app-title';
import { Routes } from '../shared/constants/routes';
import { globalStyles } from '../shared/styles/globalStyles';

export const landingStyle = makeStyles({
  landingDescription: {
    maxWidth: '80%',
    marginLeft: 'auto',
    marginRight: 'auto'
  }
});

export const Landing: React.FunctionComponent = () => {
  const landingClasses = landingStyle();
  const classes = globalStyles();
  return (
    <LandingAppTitle>
      <React.Fragment>
        <h1>Type Mania</h1>
        <p className={landingClasses.landingDescription}>
          An interactive web typing game where you can improve your typing
          skills using different challenges that you can add, delete and
          improve.
        </p>
        <Button
          className={classes.responsiveButton}
          variant="contained"
          color="primary"
          component={Link}
          to={Routes.PLAY_SELECTION}
        >
          Play now !
        </Button>
      </React.Fragment>
    </LandingAppTitle>
  );
};
