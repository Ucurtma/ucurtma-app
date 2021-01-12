import React, { lazy, Suspense, useContext } from 'react';
import { Box } from '@chakra-ui/react';
import { Routes, Route, Navigate, useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';
import Header from '../ui/header';
import LandingPage from './landing-page/landing-page';
import Loader from '../ui/loader';
import LandingFooter from './landing-page/footer';
import Topbar from '../ui/topbar';
import { MainContext } from '../../context/main-context';

const Campaign = lazy(() => import('./campaign/campaign'));
const Campaigns = lazy(() => import('./campaigns/campaigns'));
const DonateAll = lazy(() => import('./donate-all'));

function Home() {
  const location = useLocation();
  const { state } = useContext(MainContext);
  const pathnameArray = location.pathname.split('/');
  const { t } = useTranslation(['titles', 'menuItems', 'topbar']);
  const isLandingPage = location.pathname === '/';

  const menuItems = [
    {
      label: t('menuItems:homepage'),
      href: '/',
    },
    {
      label: t('menuItems:campaigns'),
      href: '/campaigns',
      disabled: true,
    },
  ];

  return (
    <>
      <main>
        {state.topNav.show && (
          <Topbar messageKey="donateAll" redirectLink="/campaign/donate-all" />
        )}
        {!isLandingPage && <Header menuItems={menuItems} />}
        <Box pt={!isLandingPage && { base: 32, lg: 20 }}>
          <Suspense fallback={<Loader isFull />}>
            <Routes>
              <Route path="campaign/donate-all" element={<DonateAll />} />
              <Route
                path="kampanya/tum-kampanyalar"
                element={<Navigate to="/campaign/donate-all" replace />}
              />
              <Route path="campaign/:id" element={<Campaign />} />
              <Route
                path="kampanya/:id"
                element={
                  <Navigate
                    to={`/campaign/${pathnameArray[pathnameArray.length - 1]}`}
                    replace
                  />
                }
              />
              <Route path="/campaigns" element={<Campaigns />} />
              <Route
                path="kampanyalar"
                element={<Navigate to="/campaigns" replace />}
              />
              <Route path="/" element={<LandingPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </Box>
      </main>
      <LandingFooter />
    </>
  );
}

export default Home;
