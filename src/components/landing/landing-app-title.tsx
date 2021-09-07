import { Box, makeStyles } from '@material-ui/core';
import React from 'react';
import { LandingBackground } from './landing-background';

const appTitleStyle = makeStyles({
  appTitle: {
    backgroundColor: 'rgba(0,0,0, 0.4)',
    color: 'white',
    fontWeight: 'bold',
    position: 'absolute',
    top: '45%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 2,
    width: '100%',
    textAlign: 'center',
    boxShadow: '0px 0px 16px black',
    animation: 'fadeInTitle 0.5s'
  }
});

export interface LandingAppTitleProps {
  children: JSX.Element;
}

/**
 * Component used to display something with the landing page style
 * @param children the children elements to display
 */
export const LandingAppTitle: React.FunctionComponent<LandingAppTitleProps> = ({
  children
}) => {
  const { appTitle } = appTitleStyle();
  return (
    <>
      <LandingBackground />
      <Box p={2} className={appTitle}>
        {children}
      </Box>
    </>
  );
};
