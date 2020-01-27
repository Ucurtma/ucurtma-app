import React, { useState } from 'react';
import { Navigation } from 'react-feather';
import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
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
import Shortlist from './shortlist';

function SplashScreen() {
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
        w={{ base: '100%', md: '50%' }}
        h={{ base: '250px', md: '100%' }}
        backgroundImage='url("/background.svg")'
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        backgroundPosition="center center"
      />
      <Container
        height={{ base: 'auto', md: '100vh' }}
        m="0 auto"
        mt={0}
        overflow="hidden"
        p={{ base: 4, md: 0 }}
      >
        <Flex
          flexDir="column"
          justifyContent={{ base: 'flex-start', md: 'center' }}
          mt={{ base: '250px', md: 0 }}
          px={{ base: '0', md: '10px' }}
        >
          <Link as={RouterLink} to="/" display="contents" id="logo">
            <Icon name="logo" size="4rem" />
          </Link>
          <Box
            zIndex="2"
            bg="white"
            maxW={{ base: '100%', md: '55%' }}
            borderRadius="3px"
            py={{ base: 4, md: 8 }}
            pr={{ md: 12 }}
            mt={{ base: '1rem' }}
          >
            <Heading size="2xl" maxW="380px" lineHeight="1.2" color="gray.600">
              Uçurtma Projesi Nedir?
            </Heading>
            <Text mt={8} color="gray.500">
              Öğrencilerin, hayallerini gerçekleştirebilmeleri için gereken
              finansal desteği bulmalarına yardım etmeyi amaçlayan bir
              platformdur.
            </Text>
            <Text mt={4} color="gray.500">
              Bunu öğrencilerle destekçileri buluşturarak burs alabilmelerinin
              garantisini merkeziyetsiz bir şekilde sunar.
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
                setContent(<Application />);
                onOpen();
              }}
            >
              Öğrenci Olarak Başvuru Yap
              <Icon as={Navigation} size="28px" mr={2} />
            </Button>
            <Text mt={8} color="gray.400">
              Şu an için sadece burs başvuruları açıktır. Gelişmelerden haberdar
              olmak için mail listemize
              <Link
                onClick={() => {
                  setContent(<Shortlist />);
                  onOpen();
                }}
                color="linkBlue"
              >
                {' '}
                buraya tıklayarak{' '}
              </Link>
              abone olabilirsiniz.
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
