import React from 'react';
import { Navigation } from 'react-feather';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import { Flex, Link, Icon, Box, Heading, Text, Button } from '@chakra-ui/core';

import FeaturedCampaign from '../../ui/featured-campaign';

function SplashScreen() {
  const { t } = useTranslation(['splashScreen', 'titles']);

  return (
    <Box>
      <Flex
        alignItems="flex-end"
        flexDir="column"
        justifyContent="center"
        width="full"
      >
        <Box
          bg="white"
          maxW={{ base: 'full', lg: '90%', xxl: '65%' }}
          px={{ base: 4, lg: 12 }}
          pb={{ base: 8, lg: 0 }}
          mt={{ base: '1rem' }}
        >
          <Link
            as={RouterLink}
            to="/"
            display="inline-block"
            id="logo"
            pos="relative"
            left={{ base: 0, lg: '-60px' }}
            top={{ base: 0, lg: '-60px' }}
            mb={{ base: 8, lg: 0 }}
          >
            <Icon name="logo" boxSize="4rem" />
          </Link>
          <Heading
            className="ucurtma-title"
            size="2xl"
            maxW="380px"
            lineHeight="1.2"
            color="gray.600"
          >
            {t('titles:What is Uçurtma')}
          </Heading>
          <Text mt={8} color="gray.600">
            {t('Purpose of Uçurtma')}
          </Text>
          <Text mt={4} color="gray.600">
            {t('Uçurtma is decentralized')}
          </Text>
          <Button
            as={RouterLink}
            to="/campaigns"
            variant="solid"
            mt={8}
            bg="#fbde38"
            color="gray.900"
            h={16}
            w="full"
            flexShrink="0"
            justifyContent="space-between"
            boxShadow="0 0 12px rgba(124, 124, 124, 0.16)"
            _hover={{ bg: 'yellow.400' }}
          >
            {t('showAllCampaigns')}
            <Icon as={Navigation} boxSize="28px" mr={2} />
          </Button>
          <Text mt={8} color="gray.400">
            <Trans t={t} i18nKey="clickHereToDonateAllCampaigns">
              Artık tüm kampanyalara tek seferde destek olabilirsiniz. Detayları
              öğrenmek ve destek olmak için{' '}
              <Link
                as={RouterLink}
                to="/campaign/donate-all"
                data-testid="shortlist"
                color="linkBlue.400"
              >
                buraya tıklayın.
              </Link>
            </Trans>
          </Text>
        </Box>
      </Flex>
      <Flex
        alignItems="center"
        justifyContent="center"
        id="splash-screen"
        maxW={{ base: '100%', lg: '50%' }}
        minH="640px"
        w="full"
        h="full"
        backgroundImage={`url("${process.env.PUBLIC_URL}/images/background.svg")`}
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        backgroundPosition="center center"
        px={4}
      >
        <FeaturedCampaign />
      </Flex>
    </Box>
  );
}

export default SplashScreen;
