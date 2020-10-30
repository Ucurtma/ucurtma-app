import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Flex, Box, Heading, Text, Button, Stack, Link } from '@chakra-ui/core';
import { ReactComponent as Background } from '../../assets/new-background.svg';
import { ReactComponent as LeftKite } from '../../assets/left-kite.svg';
import { ReactComponent as RightKite } from '../../assets/right-kite.svg';
import FeaturedCampaign from '../../ui/featured-campaign';
import Container from '../../ui/container';

function SplashScreen() {
  const { t } = useTranslation(['splashScreen', 'titles']);

  return (
    <Box id="splash-screen">
      <Flex pb={55} pos="relative" overflow="hidden">
        <Container
          d="block"
          textAlign="center"
          pt={178}
          px={4}
          maxW={{ lg: 528, xl: 728 }}
        >
          <Heading
            className="ucurtma-title"
            size="2xl"
            color="gray.900"
            textAlign="center"
          >
            {t('titles:What is Uçurtma')}
          </Heading>
          <Box mt={12} color="gray.800">
            <Text>{t('Purpose of Uçurtma')}</Text>
            <Text mt={5}>{t('Uçurtma is decentralized')}</Text>
          </Box>
          <Stack
            direction={{ base: 'column-reverse', lg: 'row' }}
            justify="center"
            mt={12}
            spacing={{ base: 6, lg: 16 }}
          >
            <Button
              as={RouterLink}
              to="/campaigns"
              size="lg"
              boxShadow="modern"
              bg="white"
              _hover={{ bg: 'gray.50' }}
              _active={{ bg: 'gray.50' }}
            >
              {t('showAllCampaigns')}
            </Button>
            <Button
              as={Link}
              isExternal
              href="https://destek.ucurtmaprojesi.com"
              size="lg"
              boxShadow="modernOrange"
              bg="orange.500"
              color="gray.100"
              _hover={{ bg: 'orange.400', textDecor: 'none' }}
              _active={{ bg: 'orange.400' }}
            >
              Tüm Öğrencilere Destek Ol
            </Button>
          </Stack>
        </Container>
        <Box
          as={LeftKite}
          pos="absolute"
          zIndex={-1}
          top="222px"
          left={{ lg: '0', xl: '17px', xxl: '222px' }}
          display={{ base: 'none', lg: 'block' }}
        />
        <Box
          as={RightKite}
          pos="absolute"
          zIndex={-1}
          top="122px"
          right={{ lg: '0', xl: '17px', xxl: '222px' }}
        />
      </Flex>
      <Flex pos="relative" overflow="hidden">
        <Container minH="680px" d="flex" alignItems="center" px={4}>
          <FeaturedCampaign />
        </Container>
        <Box d="flex" pos="absolute" top="50%">
          <Box as={Background} transform="translate(0, -50%)" zIndex={-1} />
          <Box as={Background} transform="translate(-3px, -50%)" zIndex={-1} />
        </Box>
      </Flex>
    </Box>
  );
}

export default SplashScreen;
