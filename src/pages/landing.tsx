import { Box, Button, makeStyles, Typography } from '@material-ui/core';
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

/**
 * Landing page of the application
 */
export const Landing: React.FunctionComponent = () => {
  const { landingDescription } = landingStyle();
  const { responsiveButton } = globalStyles();
  return (
    <LandingAppTitle>
      <>
        <Typography variant="h1">Type Mania</Typography>
        <Typography className={landingDescription} variant="subtitle1">
          An interactive web typing game where you can improve your typing
          skills using different challenges that you can add, delete and
          improve.
        </Typography>
        <Box p={2}>
          <Button
            className={responsiveButton}
            variant="contained"
            color="primary"
            component={Link}
            to={Routes.PLAY_SELECTION}
          >
            Play now !
          </Button>
        </Box>
      </>
    </LandingAppTitle>
  );
};
