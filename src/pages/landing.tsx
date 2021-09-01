import { Button } from '@material-ui/core';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LandingAppTitle } from '../components/landing/landing-app-title';
import { UrlContext } from '../contexts/url-context';

export const Landing: React.FunctionComponent = () => {
  const { viewChallenges } = useContext(UrlContext);
  return (
    <LandingAppTitle>
      <>
        <h1>Type Mania</h1>
        <p>
          An interactive web typing game where you can improve your typing
          skills using different challenges that you can add, delete and
          improve.
        </p>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to={viewChallenges}
        >
          Play now !
        </Button>
      </>
    </LandingAppTitle>
  );
};
