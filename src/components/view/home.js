import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';
import Header from '../ui/header';
import LandingPage from './landing-page/landing-page';
import Loader from '../ui/loader';
import LandingFooter from './landing-page/footer';

const Campaign = lazy(() => import('./campaign/campaign'));
const Campaigns = lazy(() => import('./campaigns/campaigns'));

function Home() {
  const location = useLocation();
  const { t } = useTranslation('titles');
  const isLandingPage = location.pathname === '/';

  let menuItems = [
    {
      label: 'Anasayfa',
      href: '/',
    },
  ];

  if (isLandingPage) {
    menuItems = [
      {
        label: t('What is Uçurtma'),
        href: '#splash-screen',
      },
      {
        label: t('Problem and Solution'),
        href: '#problem-solution',
      },
      {
        label: t('How it works'),
        href: '#how-it-works',
      },
      {
        label: t('Campaigns'),
        href: '#featured-campaigns',
      },
      {
        href: '#faq',
        label: t('FAQ'),
      },
    ];
  }

  return (
    <>
      <main>
        <Header withLogo={!isLandingPage} menuItems={menuItems} />
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
