import { Button } from '@material-ui/core';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LandingAppTitle } from '../components/landing/landing-app-title';
import { UrlContext } from '../contexts/url-context';

export const NotFoundError: React.FunctionComponent = () => {
  const { landing } = useContext(UrlContext);
  return (
    <LandingAppTitle>
      <>
        <h1>404 Error</h1>
        <p>Uh Oh, Looks like you lost yourself.</p>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to={landing}
        >
          Get back home !
        </Button>
      </>
    </LandingAppTitle>
  );
};
