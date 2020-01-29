import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import ReactGA from 'react-ga';
import Home from './pages/home';
import Campaign from './pages/campaign';
import 'react-calendar/dist/Calendar.css';
import { gaTrackingId } from './config';

ReactGA.initialize(gaTrackingId);
const history = createBrowserHistory();
history.listen(location => {
  ReactGA.pageview(location.pathname + location.search);
});

function App() {
  React.useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
    <Router history={history}>
      <Switch>
        <Route path="/campaign/:id">
          <Campaign />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
      <Route
        path="/"
        render={({ location }) => {
          if (typeof window.ga === 'function') {
            window.ga('set', 'page', location.pathname + location.search);
            window.ga('send', 'pageview');
          }
          return null;
        }}
      />
    </Router>
  );
}

export default App;
