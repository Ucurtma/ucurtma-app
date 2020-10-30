import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button, Flex, Image, Link } from '@chakra-ui/core';
import { Helmet } from 'react-helmet';
import SplashScreen from './splash-screen';
import ProblemSolution from './problem-and-solution';
import HowItWorks from './how-it-works';
// import FeaturedCampaigns from './featured-campaigns';
import Faq from './faq';
import MenuItems from '../../ui/menu-items';
import Container from '../../ui/container';

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
      <Box
        zIndex={2}
        position="fixed"
        top="0"
        width="full"
        bg="white"
        transition="0.2s ease all"
        px={{ base: 4, lg: 0 }}
        py={{ base: 2, lg: 0 }}
        boxShadow="modern"
      >
        <Container
          py={{ base: 1, lg: 4 }}
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
          <Flex mt={2} py={1} overflowY="auto">
            <MenuItems alignItems="center" items={menuItems} />
            <SupportButton display={{ base: 'none', lg: 'flex' }} />
          </Flex>
        </Container>
      </Box>
      <SplashScreen />
      <ProblemSolution />
      <HowItWorks />
      <Faq />
    </>
  );
}

export default LandingPage;
