import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { NotFoundError } from './pages/404';
import { Landing } from './pages/landing';
import { ViewProfiles } from './pages/view-profiles';
import reportWebVitals from './reportWebVitals';
import { TestContextProvider } from './contexts/test-context';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/profiles">Profiles</Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route exact path="/">
          <Landing />
        </Route>
        <Route path="/profiles">
          <TestContextProvider>
            <ViewProfiles />
          </TestContextProvider>
        </Route>
        <Route component={NotFoundError} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
