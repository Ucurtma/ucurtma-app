import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import ReactGA from 'react-ga';
import { Modal, ModalContent, ModalOverlay } from '@chakra-ui/core';
import { gaTrackingId } from './config';
import Loader from './components/ui/loader';
import { mainReducer, mainState, MainContext } from './context/main-context';
import LogRocket from 'logrocket';

const Home = lazy(() => import('./pages/home'));
const Campaign = lazy(() => import('./pages/campaign'));
const Redirecting = lazy(() => import('./pages/redirecting'));
const Admin = lazy(() => import('./pages/admin'));

ReactGA.initialize(gaTrackingId);
LogRocket.init('uptekx/ucurtma-app');

function App() {
  const [state, dispatch] = React.useReducer(mainReducer, mainState);
  React.useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);
  return (
    <MainContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Suspense fallback={<Loader isFull />}>
          <Routes>
            <Route path="auth/*" element={<Redirecting />} />
            <Route path="campaign" element={<Navigate to="/" replace />} />
            <Route path="campaign/:id" element={<Campaign />} />
            <Route path="manager/*" element={<Admin />} />
            <Route path="/" element={<Home />} />
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
