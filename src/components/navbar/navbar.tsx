import { AppBar, Toolbar } from '@material-ui/core';
import React from 'react';
import { AppTitle } from './app-title';

/**
 * Navbar of the application
 */
export const Navbar: React.FunctionComponent = () => {
  return (
    <AppBar style={{ backgroundColor: '#333333' }} position="sticky">
      <Toolbar>
        <AppTitle />
      </Toolbar>
    </AppBar>
  );
};
