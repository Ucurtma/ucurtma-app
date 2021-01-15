import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button, Flex, Image, Link } from '@chakra-ui/react';
import { Helmet } from 'react-helmet';
import SplashScreen from './splash-screen';
import ProblemSolution from './problem-and-solution';
import HowItWorks from './how-it-works';
// import FeaturedCampaigns from './featured-campaigns';
import FeaturedCampaign from '../../ui/featured-campaign';
import Faq from './faq';
import MenuItems from '../../ui/menu-items';
import Container from '../../ui/container';
import Background from '../../assets/new-background.svg';
import DonatePage from './donate-page';

export function SupportButton({ ...otherProps }) {
  return (
    <Button
      variant="solid"
      bg="gray.800"
      color="white"
      size="md"
      fontSize="sm"
      as={Link}
      href="https://destek.ucurtmaprojesi.com"
      isExternal
      ml={4}
      _hover={{ bg: 'gray.700', textDecor: 'none' }}
      _active={{ bg: 'gray.700' }}
      {...otherProps}
    >
      Destek Ol
    </Button>
  );
}

function LandingPage() {
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
    {
      label: t('Campaigns'),
      href: '/campaigns',
    },
    {
      href: '#faq',
      label: t('FAQ'),
    },
  ];

  return (
    <>
      <Helmet>
        <title>Uçurtma Projesi</title>
      </Helmet>
      <Box mt="36px" width="full" bg="white" transition="0.2s ease all">
        <Container
          py={{ base: 1, lg: 4 }}
          px={{ base: 4, lg: 0 }}
          justifyContent="space-between"
          alignItems="center"
        >
          <Box
            display={{ base: 'flex', lg: 'block' }}
            w={{ base: 'full', lg: 'unset' }}
            justifyContent="space-between"
            alignItems="center"
          >
            <Image
              alt="Uçurtma Projesi"
              src={`${process.env.PUBLIC_URL}/images/logo-black.svg`}
            />
            <SupportButton display={{ lg: 'none', base: 'flex' }} size="sm" />
          </Box>
          <Flex mt={2} py={1} overflowY={{ base: 'auto', lg: 'unset' }}>
            <MenuItems alignItems="center" items={menuItems} />
            <SupportButton display={{ base: 'none', lg: 'flex' }} />
          </Flex>
        </Container>
      </Box>
      <Box>
        <SplashScreen />
      </Box>
      <Container
        borderRadius={{ base: 22, lg: 139 }}
        bgImage={`url(${Background})`}
        bgSize="cover"
        minH="680px"
        d="flex"
        alignItems="center"
        px={4}
        width={{ base: '95%', lg: 'full' }}
        pos="relative"
      >
        <FeaturedCampaign />
      </Container>
      <ProblemSolution />
      <Flex px={{ base: 4, lg: 0 }} mt="198px" id="how-it-works">
        <HowItWorks />
      </Flex>
      <Box mt="330px" mb="210px">
        <DonatePage />
      </Box>
      <Faq />
    </>
  );
}

export default LandingPage;
