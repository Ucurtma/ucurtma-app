import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { Helmet } from 'react-helmet';
import SplashScreen from './splash-screen';
import ProblemSolution from './problem-and-solution';
import HowItWorks from './how-it-works';
import FeaturedCampaign from '../../ui/featured-campaign';
import Faq from './faq';

import DonatePage from './donate-page';
import LandingPageHeader from '../../ui/landing-page-header';

function LandingPage() {
  return (
    <>
      <Helmet>
        <title>Uçurtma Projesi</title>
      </Helmet>
      <Box mt="36px" width="full" bg="white" transition="0.2s ease all">
        <LandingPageHeader />
      </Box>
      <Flex mt={{ base: 84, lg: 126 }}>
        <SplashScreen />
      </Flex>
      <Box mt={165}>
        <FeaturedCampaign />
      </Box>
      <Flex id="problem-solution" mt={158} px={{ base: 4, lg: 0 }}>
        <ProblemSolution />
      </Flex>
      <Flex px={{ base: 4, lg: 0 }} mt="198px" id="how-it-works">
        <HowItWorks />
      </Flex>
      <Box mt="330px" mb="210px">
        <DonatePage />
      </Box>
      <Flex id="faq" bg="gray.900" py={16} px={4}>
        <Faq />
      </Flex>
    </>
  );
}

export default LandingPage;
