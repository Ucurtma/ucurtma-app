import React, { Suspense, lazy } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import ReactGA from 'react-ga';
import 'react-calendar/dist/Calendar.css';
import { gaTrackingId } from './config';
import Loader from './components/ui/loader';

const Home = lazy(() => import('./pages/home'));
const Campaign = lazy(() => import('./pages/campaign'));
const Redirecting = lazy(() => import('./pages/redirecting'));

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
      <Suspense fallback={<Loader isFull />}>
        <Switch>
          <Route path="/auth">
            <Redirecting />
          </Route>
          <Route path="/campaign/:id">
            <Campaign />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Suspense>
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
