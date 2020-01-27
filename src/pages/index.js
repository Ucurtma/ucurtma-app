import React from 'react';
import SplashScreen from '../components/view/landing-page/splash-screen';
import HowItWorks from '../components/view/landing-page/how-it-works';
import OurTeam from '../components/view/landing-page/our-team';
import ProblemSolution from '../components/view/landing-page/problem-and-solution';
import LandingFooter from '../components/view/landing-page/footer';
import Faq from '../components/view/landing-page/faq';
import Header from '../components/ui/header';

function Home() {
  const menuItems = [
    {
      label: 'Nedir?',
      href: '#splash-screen',
    },
    {
      label: 'Sorun ve Çözüm',
      href: '#problem-solution',
    },
    {
      href: '#how-it-works',
      label: 'Nasıl Çalışır',
    },
    {
      href: '#our-team',
      label: 'Ekibimiz',
    },
    {
      href: '#faq',
      label: 'SSS',
    },
  ];

  return (
    <>
      <Header menuItems={menuItems} />
      <SplashScreen />
      <ProblemSolution />
      <HowItWorks />
      <OurTeam />
      <Faq />
      <LandingFooter />
    </>
  );
}

export default Home;
