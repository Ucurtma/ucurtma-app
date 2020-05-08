import React, { Suspense, lazy, createContext } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import ReactGA from 'react-ga';
import 'react-calendar/dist/Calendar.css';
import { gaTrackingId } from './config';
import Loader from './components/ui/loader';

const Home = lazy(() => import('./pages/home'));
const Campaign = lazy(() => import('./pages/campaign'));
const Redirecting = lazy(() => import('./pages/redirecting'));
const Admin = lazy(() => import('./pages/admin'));

export const WalletContext = createContext();

const initialState = { wallet: '' };

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_WALLET':
      localStorage.setItem('wallet', JSON.stringify(action.payload));
      return {
        ...state,
        wallet: action.payload,
      };
    default:
      return state;
  }
};

ReactGA.initialize(gaTrackingId);

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  React.useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
    <WalletContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Suspense fallback={<Loader isFull />}>
          <Routes>
            <Route path="auth/*" element={<Redirecting />} />
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
    </WalletContext.Provider>
  );
}

export default App;
