import React from 'react';
import SplashScreen from '../components/view/landing-page/splash-screen';
import HowItWorks from '../components/view/landing-page/how-it-works';
import OurTeam from '../components/view/landing-page/our-team';
import ProblemSolution from '../components/view/landing-page/problem-and-solution';

function Home() {
  return (
    <>
      <SplashScreen />
      <ProblemSolution />
      <HowItWorks />
      <OurTeam />
    </>
  );
}

export default Home;
