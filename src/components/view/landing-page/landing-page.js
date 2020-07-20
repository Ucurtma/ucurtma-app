import React from 'react';
import { useTranslation } from 'react-i18next';
import { IconButton, useDisclosure } from '@chakra-ui/core';
import { Menu } from 'react-feather';
import SplashScreen from './splash-screen';
import ProblemSolution from './problem-and-solution';
import HowItWorks from './how-it-works';
// import FeaturedCampaigns from './featured-campaigns';
import Faq from './faq';
import MenuItems from '../../ui/menu-items';
import MenuDrawer from '../../ui/menu-drawer';
import Container from '../../ui/container';

function LandingPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
      <Container
        position="absolute"
        zIndex={2}
        justifyContent="flex-end"
        left="50%"
        transform="translate(-50%, 0)"
      >
        <MenuItems
          alignItems="center"
          display={{ base: 'none', lg: 'flex' }}
          items={menuItems}
        />
        <IconButton
          aria-label="Navigation"
          position="fixed"
          top={3}
          right={3}
          icon={Menu}
          display={{ base: 'inline-flex', lg: 'none' }}
          color="gray.600"
          px={2}
          bg="white"
          boxShadow="cardLight"
          onClick={onOpen}
          zIndex="9"
        />

        <MenuDrawer items={menuItems} isOpen={isOpen} onClose={onClose} />
      </Container>
      <SplashScreen />
      <ProblemSolution />
      <HowItWorks />
      {/* <FeaturedCampaigns /> */}
      {/* <OurTeam /> */}
      <Faq />
    </>
  );
}

export default LandingPage;
