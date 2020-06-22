import React from 'react';
import SplashScreen from './splash-screen';
import ProblemSolution from './problem-and-solution';
import HowItWorks from './how-it-works';
import FeaturedCampaigns from './featured-campaigns';
import Faq from './faq';

function LandingPage() {
  return (
    <>
      <SplashScreen />
      <ProblemSolution />
      <HowItWorks />
      <FeaturedCampaigns />
      {/* <OurTeam /> */}
      <Faq />
    </>
  );
}

export default LandingPage;
