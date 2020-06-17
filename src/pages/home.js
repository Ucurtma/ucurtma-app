import React from 'react';
import { useTranslation } from 'react-i18next';
import SplashScreen from '../components/view/landing-page/splash-screen';
import HowItWorks from '../components/view/landing-page/how-it-works';
// import OurTeam from '../components/view/landing-page/our-team';
import ProblemSolution from '../components/view/landing-page/problem-and-solution';
import LandingFooter from '../components/view/landing-page/footer';
import Faq from '../components/view/landing-page/faq';
import Header from '../components/ui/header';

function Home() {
  const { t } = useTranslation('titles');
  const menuItems = [
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
    // {
    //   href: '#our-team',
    //   label: t('Our Team'),
    // },
    {
      href: '#faq',
      label: t('FAQ'),
    },
  ];

  return (
    <>
      <Header menuItems={menuItems} />
      <SplashScreen />
      <ProblemSolution />
      <HowItWorks />
      {/* <OurTeam /> */}
      <Faq />
      <LandingFooter />
    </>
  );
}

export default Home;
