import React, { useState } from 'react';
import { Navigation } from 'react-feather';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import {
  Flex,
  Link,
  Icon,
  Box,
  Heading,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
} from '@chakra-ui/core';

import { useQuery } from '@apollo/react-hooks';
import Application from './application';
import Shortlist from './shortlist';
import { GET_CAMPAIGNS } from '../../../graphql/queries';
import FeaturedCampaign from '../../ui/featured-campaign';

function SplashScreen() {
  const { t } = useTranslation(['splashScreen', 'titles']);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { loading, error, data } = useQuery(GET_CAMPAIGNS, {
    variables: { start: 0, end: 8 },
  });
  const [content, setContent] = useState(<Application />);

  return (
    <>
      <Flex
        h={{ base: 'auto', lg: '100vh' }}
        w="full"
        flexDir={{ base: 'column', lg: 'row' }}
      >
        <Flex alignItems="flex-end" flexDir="column" justifyContent="center">
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
              <Icon name="logo" size="4rem" />
            </Link>
            <Heading size="2xl" maxW="380px" lineHeight="1.2" color="gray.600">
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
              <Icon as={Navigation} size="28px" mr={2} />
            </Button>
            <Text mt={8} color="gray.600">
              <Trans i18nKey="Click here to subscribe">
                Gelişmelerden haberdar olmak için mail listemize{' '}
                <Link
                  data-testid="shortlist"
                  onClick={() => {
                    setContent(<Shortlist />);
                    onOpen();
                  }}
                  color="linkBlue.400"
                >
                  buraya tıklayarak
                </Link>{' '}
                abone olabilirsiniz
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
          <FeaturedCampaign data={data} error={error} loading={loading} />
        </Flex>
      </Flex>

      <Modal size="md" borderRadius="4px" onClose={onClose} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <Flex flexDir="column">{content}</Flex>
        </ModalContent>
      </Modal>
    </>
  );
}

export default SplashScreen;
