import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Navbar } from './components/navbar/navbar';
import { UrlContext } from './contexts/url-context';
import { NotFoundError } from './pages/404';
import { InGame } from './pages/in-game';
import { Landing } from './pages/landing';
import { ViewChallenges } from './pages/view-challenges';

export const App: React.FunctionComponent = () => {
  const { landing, inGame, viewChallenges } = useContext(UrlContext);
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path={landing}>
            <Landing />
          </Route>
          <Route path={inGame}>
            <InGame />
          </Route>
          <Route path={viewChallenges}>
            <ViewChallenges />
          </Route>
          <Route component={NotFoundError} />
        </Switch>
      </Router>
    </>
  );
};
