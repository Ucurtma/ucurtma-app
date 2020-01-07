import React from 'react';
import NextLink from 'next/link';
import { Flex, Link, Icon, Box, Heading, Text } from '@chakra-ui/core';
import Container from '../../ui/container';
import Application from '../../../pages/application';

function SplashScreen() {
  return (
    <>
      <Box
        position="absolute"
        top="0"
        right="0"
        w="50%"
        h="100%"
        backgroundImage='url("/background.svg")'
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        backgroundPosition="center center"
      />
      <Container height="100vh" m="0 auto" mt={0} overflow="hidden">
        <Flex flexDir="column" justifyContent="center">
          <NextLink href="/">
            <Link display="contents" id="logo">
              <Icon name="logo" size="4rem" />
            </Link>
          </NextLink>
          <Box
            zIndex="2"
            bg="white"
            maxW="55%"
            borderRadius="3px"
            pr={{ base: '0', md: 12 }}
            py={{ base: '0', md: 8 }}
            mt={{ base: '1rem' }}
          >
            <Heading size="2xl" maxW="320px" lineHeight="1" color="gray.600">
              Uçurtma Projesi Nedir?
            </Heading>
            <Text mt="2rem" fontSize="18px" color="gray.500">
              Başarılı, çalışkan ya da yetenekli öğrencilerin eğitim hayatları
              sırasında hayal ettikleri hedefe ulaşmalarına yardımcı olacak
              maddi desteği güvenli, denetlenebilir ve adil bir şekilde
              sağlayacak bir araçtır.
            </Text>
          </Box>
        </Flex>
      </Container>
      <Flex flexDir="column" backgroundColor="gray.700">
        <Container mt="0">
          <Heading
            size="xl"
            margin="0 auto"
            my={12}
            lineHeight="1"
            color="gray.100"
          >
            Burs için başvuru yap
          </Heading>
          <Application />
        </Container>
      </Flex>
    </>
  );
}

export default SplashScreen;
