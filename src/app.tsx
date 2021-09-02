import { ThemeProvider, createTheme, CssBaseline } from '@material-ui/core';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Navbar } from './components/navbar/navbar';
import { ChallengeProvider } from './contexts/challenge-context';
import { NotFoundError } from './pages/404';
import { Landing } from './pages/landing';
import { Play } from './pages/play';
import { Routes } from './shared/constants/routes';

const theme = createTheme({
  palette: {
    type: 'dark'
  }
});

export const App: React.FunctionComponent = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Switch>
          <Route exact path={Routes.LANDING}>
            <Landing />
          </Route>
          <Route path={Routes.PLAY}>
            <ChallengeProvider>
              <Play />
            </ChallengeProvider>
          </Route>
          <Route component={NotFoundError} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};
