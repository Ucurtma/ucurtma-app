import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { IconButton, Box, useDisclosure, Icon } from '@chakra-ui/core';
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
  const [topOffset, setTopOffset] = useState(0);
  const [pageOffset, setPageOffset] = useState(0);
  const { t } = useTranslation('titles');

  useEffect(() => {
    const title = document.querySelector('ucurtma-title');
    window.addEventListener('scroll', () => {
      setPageOffset(window.pageYOffset);
      setTopOffset(title?.offsetTop || 308);
    });
  }, []);

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
      <Box
        zIndex={2}
        position={pageOffset > topOffset ? 'fixed' : 'absolute'}
        top="0"
        width="full"
        bg={pageOffset > topOffset ? 'white' : 'transparent'}
        transition="0.2s ease all"
        p={{ base: 4, lg: 0 }}
      >
        <Container
          justifyContent={pageOffset > topOffset ? 'space-between' : 'flex-end'}
          alignItems="center"
        >
          {pageOffset > topOffset && (
            <Box>
              <Icon name="logo" size="2rem" />
            </Box>
          )}
          <Box>
            <MenuItems
              alignItems="center"
              display={{ base: 'none', lg: 'flex' }}
              items={menuItems}
            />
            <IconButton
              aria-label="Navigation"
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
          </Box>
        </Container>
      </Box>
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
