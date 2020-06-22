import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router';
import Header from '../ui/header';
import LandingPage from './landing-page/landing-page';
import Loader from '../ui/loader';
import LandingFooter from './landing-page/footer';

const Campaign = lazy(() => import('./campaign/campaign'));
const Campaigns = lazy(() => import('./campaigns/campaigns'));

function Home() {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';
  const menuItems = [
    {
      label: 'Anasayfa',
      href: '/',
    },
  ];

  return (
    <>
      <main>
        <Header
          withLogo={!isLandingPage}
          menuItems={menuItems}
          hideMenu={isLandingPage}
        />
        <Suspense fallback={<Loader isFull />}>
          <Routes>
            <Route path="campaign/:id" element={<Campaign />} />
            <Route path="/campaigns" element={<Campaigns />} />
            <Route path="/" element={<LandingPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>
      <LandingFooter />
    </>
  );
}

export default Home;
