import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Navbar } from './components/navbar';
import { NotFoundError } from './pages/404';
import { Landing } from './pages/landing';
import { ViewProfiles } from './pages/view-profiles';

export const App: React.FunctionComponent = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Landing />
          </Route>
          <Route path="/profiles">
            <ViewProfiles />
          </Route>
          <Route component={NotFoundError} />
        </Switch>
      </Router>
    </>
  );
};
