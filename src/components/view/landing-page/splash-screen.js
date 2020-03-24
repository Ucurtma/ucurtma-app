import React, { useState } from 'react';
import { Navigation } from 'react-feather';
import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
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
import Container from '../../ui/container';
import Application from './application';
import ApplicationPaused from './application-paused';
import Shortlist from './shortlist';

function SplashScreen() {
  const { t } = useTranslation(['splashScreen', 'titles']);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [content, setContent] = useState(<Application />);
  return (
    <>
      <Helmet>
        <title>Uçurtma Projesi</title>
      </Helmet>
      <Box
        id="splash-screen"
        position="absolute"
        top="0"
        right="0"
        w={{ base: '100%', lg: '50%' }}
        h={{ base: '250px', lg: '100%' }}
        backgroundImage={`url("${process.env.PUBLIC_URL}/images/background.svg")`}
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        backgroundPosition="center center"
      />
      <Container
        height={{ base: 'auto', lg: '100vh' }}
        m="0 auto"
        mt={0}
        overflow="hidden"
        p={{ md: 4, lg: 0 }}
      >
        <Flex
          flexDir="column"
          justifyContent={{ base: 'flex-start', md: 'center' }}
          mt={{ base: '250px', md: 0 }}
          px={{ base: 4, md: '10px' }}
        >
          <Link as={RouterLink} to="/" display="contents" id="logo">
            <Icon name="logo" size="4rem" />
          </Link>
          <Box
            zIndex="2"
            bg="white"
            maxW={{ base: '100%', md: '85%', lg: '55%' }}
            borderRadius="3px"
            py={{ base: 4, lg: 8 }}
            px={{ base: 0, md: 8, lg: 12 }}
            mt={{ base: '1rem' }}
          >
            <Heading size="2xl" maxW="380px" lineHeight="1.2" color="gray.600">
              {t('titles:What is Uçurtma')}
            </Heading>
            <Text mt={8} color="gray.500">
              {t('Purpose of Uçurtma')}
            </Text>
            <Text mt={4} color="gray.500">
              {t('Uçurtma is decentralized')}
            </Text>
            <Button
              variant="solid"
              mt={8}
              bg={{ base: 'gray.100', md: 'white' }}
              h={16}
              w={{ base: '100%', md: '125%' }}
              flexShrink="0"
              justifyContent="space-between"
              boxShadow="0 0 12px rgba(124, 124, 124, 0.16)"
              onClick={() => {
                setContent(<ApplicationPaused />);
                onOpen();
              }}
            >
              {t('Apply as a student')}
              <Icon as={Navigation} size="28px" mr={2} />
            </Button>
            <Text mt={8} color="gray.400">
              <Trans i18nKey="Click here to subscribe">
                Gelişmelerden haberdar olmak için mail listemize{' '}
                <Link
                  onClick={() => {
                    setContent(<Shortlist />);
                    onOpen();
                  }}
                  color="linkBlue"
                >
                  buraya tıklayarak
                </Link>{' '}
                abone olabilirsiniz
              </Trans>
            </Text>
          </Box>
        </Flex>
      </Container>
      <Modal size="5xl" borderRadius="4px" onClose={onClose} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <Flex flexDir="column">{content}</Flex>
        </ModalContent>
      </Modal>
    </>
  );
}

export default SplashScreen;
