import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import ReactGA from 'react-ga';
import Eth from 'ethjs';
import 'react-calendar/dist/Calendar.css';
import { gaTrackingId } from './config';
import Loader from './components/ui/loader';

const Home = lazy(() => import('./pages/home'));
const Campaign = lazy(() => import('./pages/campaign'));
const Redirecting = lazy(() => import('./pages/redirecting'));
const Admin = lazy(() => import('./pages/admin'));

export const eth = new Eth(new Eth.HttpProvider('https://ropsten.infura.io'));

ReactGA.initialize(gaTrackingId);

function App() {
  React.useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
    <BrowserRouter>
      <Suspense fallback={<Loader isFull />}>
        <Routes>
          <Route path="auth" element={<Redirecting />} />
          <Route path="campaign" element={<Navigate to="/" replace />} />
          <Route path="campaign/:id" element={<Campaign />} />
          <Route path="manager" element={<Admin />} />
          <Route path="manager/:slug" element={<Admin />} />
          <Route path="/" element={<Home />} />
        </Routes>
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
    </BrowserRouter>
  );
}

export default App;
