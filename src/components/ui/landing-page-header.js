import { useTranslation } from 'react-i18next';
import { Box, Button, Flex, Image } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import Container from './container';
import MenuItems from './menu-items';
import SelectLanguage from './select-language';

export function SupportButton({ ...otherProps }) {
  const { t } = useTranslation('titles');

  return (
    <Button
      as={Link}
      to="#donate-all"
      variant="solid"
      bg="gray.800"
      color="white"
      size="md"
      fontSize="sm"
      ml={4}
      _hover={{ bg: 'gray.700', textDecor: 'none' }}
      _active={{ bg: 'gray.700' }}
      onClick={() => {
        const element = document.querySelector('#donate-all');
        element.scrollIntoView({ behavior: 'smooth' });
      }}
      {...otherProps}
    >
      {t('Donate')}
    </Button>
  );
}

function LandingPageHeader({ activeMenuItem }) {
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
    <Container
      py={{ base: 1, lg: 4 }}
      px={{ base: 4, lg: 0 }}
      justifyContent="space-between"
      alignItems="center"
      position="fixed"
      top="0"
      right="0"
      left="0"
      bg="white"
      zIndex="2"
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
        <Flex align="center">
          <SelectLanguage display={{ base: 'flex', lg: 'none' }} size="sm" />
          <SupportButton display={{ base: 'flex', lg: 'none' }} size="sm" />
        </Flex>
      </Box>
      <Flex mt={2} py={1} overflowY={{ base: 'auto', lg: 'unset' }}>
        <MenuItems
          alignItems="center"
          items={menuItems}
          activeMenuItem={activeMenuItem}
        />
        <SupportButton display={{ base: 'none', lg: 'flex' }} />
        <SelectLanguage display={{ base: 'none', lg: 'flex' }} />
      </Flex>
    </Container>
  );
}

export default LandingPageHeader;
