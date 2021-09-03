import {
  CssBaseline,
  ThemeProvider,
  unstable_createMuiStrictModeTheme
} from '@material-ui/core';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Navbar } from './components/navbar/navbar';
import { ChallengeProvider } from './contexts/challenges/challenges-context';
import { ModalProvider } from './contexts/dialog-context';
import { NotFoundError } from './pages/404';
import { Landing } from './pages/landing';
import { PlayInGame } from './pages/play-in-game';
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
          <Router>
            <Navbar />
            <Switch>
              <Route exact path={Routes.LANDING}>
                <Landing />
              </Route>
              <Route exact path={Routes.PLAY_SELECTION}>
                <PlaySelection />
              </Route>
              <Route path={Routes.PLAY_IN_GAME}>
                <PlayInGame />
              </Route>
              <Route component={NotFoundError} />
            </Switch>
          </Router>
        </ModalProvider>
      </ChallengeProvider>
    </ThemeProvider>
  );
};
