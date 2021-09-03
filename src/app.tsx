import {
  CssBaseline,
  ThemeProvider,
  unstable_createMuiStrictModeTheme
} from '@material-ui/core';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Navbar } from './components/navbar/navbar';
import { ChallengeProvider } from './contexts/challenges/challenges-context';
import { FormProvider } from './contexts/form-context';
import { ModalProvider } from './contexts/dialog-context';
import { NotFoundError } from './pages/404';
import { Landing } from './pages/landing';
import { PlaySelection } from './pages/play-selection';
import { Routes } from './shared/constants/routes';

const theme = unstable_createMuiStrictModeTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#90caf9'
    },
    secondary: {
      main: '#f48fb1'
    }
  }
});

export const App: React.FunctionComponent = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ChallengeProvider>
        <ModalProvider>
          <FormProvider>
            <Router>
              <Navbar />
              <Switch>
                <Route exact path={Routes.LANDING}>
                  <Landing />
                </Route>
                <Route exact path={Routes.PLAY}>
                  <PlaySelection />
                </Route>
                <Route component={NotFoundError} />
              </Switch>
            </Router>
          </FormProvider>
        </ModalProvider>
      </ChallengeProvider>
    </ThemeProvider>
  );
};
