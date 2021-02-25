import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ReactGA from 'react-ga';
import LogRocket from 'logrocket';
import { Box } from '@chakra-ui/react';
import { gaTrackingId, isProduction } from './config';
import ScrollToTop from './components/ui/scroll-to-top';
import { StoreProvider } from './context/global-state';
import SharedElements from './components/shared-elements';
import Loader from './components/ui/loader';

const Home = lazy(() => import('./components/pages/home'));
const Redirecting = lazy(() => import('./components/pages/redirecting'));
const Manager = lazy(() => import('./components/pages/manager'));

if (isProduction) {
  LogRocket.init('uptekx/ucurtma-app');
  ReactGA.initialize(gaTrackingId);
}

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    if (isProduction) {
      ReactGA.pageview(window.location.pathname + window.location.search);
    }

    if (localStorage.getItem('language')) {
      i18n.changeLanguage(localStorage.getItem('language'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StoreProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Suspense
          fallback={
            <Box
              w="full"
              minH="100vh"
              d="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Loader />
            </Box>
          }
        >
          <Routes>
            <Route path="auth/*" element={<Redirecting />} />
            <Route path="manager/*" element={<Manager />} />
            <Route path="/*" element={<Home />} />
            <Route path="*" element={<Navigate to="/" replace />} />
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
      <SharedElements />
    </StoreProvider>
  );
}

export default App;
