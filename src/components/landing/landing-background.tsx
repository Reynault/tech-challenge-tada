import { makeStyles } from '@material-ui/core';
import React from 'react';
import LandingBackgroundImage from '../../assets/images/background-landing-1.jpg';

const backgroundStyle = makeStyles({
  landingBackgroundImage: {
    backgroundImage: `url(${LandingBackgroundImage})`,
    filter: 'blur(8px)',
    height: '90vh',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
  }
});

export const LandingBackground: React.FunctionComponent = () => {
  const classes = backgroundStyle();
  return <div className={classes.landingBackgroundImage} />;
};
