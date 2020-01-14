import React from 'react';
import SplashScreen from '../components/view/landing-page/splash-screen';
import HowItWorks from '../components/view/landing-page/how-it-works';
import OurTeam from '../components/view/landing-page/our-team';

function Home() {
  return (
    <>
      <SplashScreen />
      <HowItWorks />
      <OurTeam />
    </>
  );
}

export default Home;
