import { useTranslation } from 'react-i18next';
import { Box, Button, Flex, Image, Link } from '@chakra-ui/react';
import React from 'react';
import Container from './container';
import MenuItems from './menu-items';
import SelectLanguage from './select-language';

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

function LandingPageHeader() {
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
          <SupportButton display={{ base: 'flex', lg: 'none' }} size="sm" />
          <SelectLanguage display={{ base: 'flex', lg: 'none' }} size="sm" />
        </Flex>
      </Box>
      <Flex mt={2} py={1} overflowY={{ base: 'auto', lg: 'unset' }}>
        <MenuItems alignItems="center" items={menuItems} />
        <SupportButton display={{ base: 'none', lg: 'flex' }} />
        <SelectLanguage display={{ base: 'none', lg: 'flex' }} />
      </Flex>
    </Container>
  );
}

export default LandingPageHeader;

/* <Select
          bg="transparent"
          variant="outline"
          color="gray.100"
          fontWeight={600}
          size="sm"
          onChange={e => {
            i18n.changeLanguage(e.currentTarget.value);
            localStorage.setItem('lang', e.currentTarget.value);
            setLangValue(e.currentTarget.value);
          }}
          value={langValue}
          id="change-language"
        >
          <Box as="option" value="tr" color="gray.800">
            Turkish
          </Box>
          <Box as="option" value="en" color="gray.800">
            English
          </Box>
        </Select>  */
