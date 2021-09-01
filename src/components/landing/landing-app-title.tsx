import { Button, makeStyles } from '@material-ui/core';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UrlContext } from '../../contexts/url-context';
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
    paddingBottom: '20px',
    textAlign: 'center'
  }
});

export interface LandingAppTitleProps {
  children: JSX.Element;
}

export const LandingAppTitle: React.FunctionComponent<LandingAppTitleProps> = (
  props: LandingAppTitleProps
) => {
  const classes = appTitleStyle();
  return (
    <>
      <LandingBackground />
      <div className={classes.appTitle}>{props.children}</div>
    </>
  );
};
