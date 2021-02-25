import React, { useEffect } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import { parse } from 'query-string';
import { Helmet } from 'react-helmet';
import SplashScreen from '../ui/landing-page/splash-screen';
import ProblemSolution from '../ui/landing-page/problem-and-solution';
import HowItWorks from '../ui/landing-page/how-it-works';
import FeaturedCampaign from '../ui/featured-campaign';
import Faq from '../ui/landing-page/faq';
import DonatePage from '../ui/landing-page/donate-page';
import LandingPageHeader from '../ui/landing-page-header';
import SponsorList from '../ui/landing-page/sponsor-list';

function LandingPage() {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.redirectedFromAuth) {
      document
        .querySelector('#landing-payment')
        .scrollIntoView({ behavior: 'smooth' });
    }

    const URLQueries = parse(location.search);

    if (location.hash === '#donate-section' || URLQueries.ref) {
      document.querySelector('#donate-section').scrollIntoView();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Helmet>
        <title>Uçurtma Projesi</title>
      </Helmet>
      <Box mt="36px" width="full" bg="white" transition="0.2s ease all">
        <LandingPageHeader />
      </Box>
      <Flex as="section" id="splash-screen" mt={{ base: 84, lg: 126 }}>
        <SplashScreen />
      </Flex>
      <Box as="section" mt={165}>
        <FeaturedCampaign />
      </Box>
      <Flex as="section" id="problem-solution" mt={158} px={{ base: 4, lg: 0 }}>
        <ProblemSolution />
      </Flex>
      <Flex as="section" px={{ base: 4, lg: 0 }} mt="198px" id="how-it-works">
        <HowItWorks />
      </Flex>
      <Box as="section" mt="330px" mb={120}>
        <DonatePage />
      </Box>
      <Box mb={210}>
        <SponsorList />
      </Box>
      <Flex as="section" id="faq" mb={210} px={{ base: 4, lg: 0 }}>
        <Faq />
      </Flex>
    </>
  );
}

export default LandingPage;
