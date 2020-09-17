import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import ReactGA from 'react-ga';
import { Modal, ModalContent, ModalOverlay } from '@chakra-ui/core';
import LogRocket from 'logrocket';
import { gaTrackingId, isProduction } from './config';
import Loader from './components/ui/loader';
import { mainReducer, mainState, MainContext } from './context/main-context';
import ScrollToTop from './components/ui/scroll-to-top';

const Home = lazy(() => import('./components/view/home'));
const Redirecting = lazy(() => import('./components/view/redirecting'));
const Manager = lazy(() => import('./components/view/manager'));

if (isProduction) {
  ReactGA.initialize(gaTrackingId);
  LogRocket.init('uptekx/ucurtma-app');
}

function App() {
  const [state, dispatch] = React.useReducer(mainReducer, mainState);

  React.useEffect(() => {
    if (isProduction) {
      ReactGA.pageview(window.location.pathname + window.location.search);
    }
  }, []);

  return (
    <MainContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<Loader isFull />}>
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
      {state.modal.isOpen && (
        <Modal
          isOpen={state.modal.isOpen}
          onClose={() =>
            state.modal.closable &&
            dispatch({ type: 'SET_MODAL', payload: { isOpen: false } })
          }
          {...state.modal.otherProps}
        >
          {state.modal.overlay && <ModalOverlay />}
          <ModalContent>{state.modal.content}</ModalContent>
        </Modal>
      )}
    </MainContext.Provider>
  );
}

export default App;
