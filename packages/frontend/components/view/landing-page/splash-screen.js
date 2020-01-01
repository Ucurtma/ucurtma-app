import React, { useState, useEffect } from 'react';
import NextLink from 'next/link';
import { Waypoint } from 'react-waypoint';
import {
  Grid,
  Flex,
  Link,
  Icon,
  Box,
  Heading,
  Text,
  Button,
} from '@chakra-ui/core';

function SplashScreen() {
  const [scrolled, setScrolled] = useState(false);

  function scrollHandler() {
    if (document.getElementsByTagName('html')[0].scrollTop === 0) {
      setScrolled(false);
    } else {
      setScrolled(true);
    }
  }

  useEffect(() => {
    scrollHandler();
    document.addEventListener('scroll', () => scrollHandler(), {
      capture: false,
      passive: true,
    });

    return document.removeEventListener('scroll', () => scrollHandler());
  }, []);

  const scrolledGridProps = {
    maxWidth: {
      base: '92%',
      lg: 'containers.lg',
      xl: 'containers.xl',
    },
    height: { base: 'auto', lg: '90vh' },
    marginTop: '2rem',
    marginBottom: '1rem',
    bg: '#fff',
    borderRadius: '0.5rem',
    boxShadow: '0 12px 48px rgba(0, 0, 0, 0.1)',
  };

  const scrolledIllustrationProps = {
    borderBottomRightRadius: { base: '0.5rem', md: '0.5rem' },
    borderBottomLeftRadius: { base: '0.5rem', md: '0' },
    borderTopRightRadius: { md: '0.5rem' },
  };

  return (
    <>
      <Waypoint onLeave={() => setScrolled(true)} />
      <Grid
        height="100vh"
        templateColumns={{
          base: 'inherit',
          md: '50% auto',
          lg: '40% auto',
          xl: '30% auto',
        }}
        maxWidth="100%"
        m="0 auto"
        templateRows={{
          base: 'auto 40%',
          sm: 'auto 50%',
          md: 'inherit',
        }}
        transition="0.5s ease all"
        overflow="hidden"
        {...(scrolled && scrolledGridProps)}
      >
        <Flex
          pt={{ base: '2rem', md: '3rem' }}
          pl={{ base: '2rem', md: '3rem' }}
          pr={{ base: '2rem', md: '0' }}
          pb={{ base: '2rem', md: '10rem' }}
          flexDir="column"
          justifyContent={{ md: 'space-between' }}
          bg="red"
        >
          <NextLink href="/">
            <Link display="contents" id="logo">
              <Icon name="logo" size="4rem" />
            </Link>
          </NextLink>
          <Box pr={{ base: '0', md: '3rem' }} mt={{ base: '4rem', md: '0' }}>
            <Heading maxW="280px" lineHeight="1" color="gray.900">
              Uçurtma Projesi Nedir?
            </Heading>
            <Text mt="1.5rem" color="gray.500">
              Başarılı, çalışkan ya da yetenekli öğrencilerin eğitim hayatları
              sırasında hayal ettikleri hedefe ulaşmalarına yardımcı olacak
              maddi desteği güvenli, denetlenebilir ve adil bir şekilde
              sağlayacak bir araçtır.
            </Text>
            <Button
              float="right"
              variant="ghost"
              mt="1rem"
              // rightIcon="arrow-forward"
              color="gray.500"
            >
              Çok Yakında Burada!
            </Button>
          </Box>
          {/* <Flex>
      <Button
        float="right"
        variant="solid"
        mt="1rem"
        bg="white"
        h="66px"
        w="115%"
        flexShrink="0"
        justifyContent="space-between"
        boxShadow="0 0 12px rgba(124, 124, 124, 0.16)"
      >
        Kendin için bir kampanya yarat
        <Icon as={Navigation} size="28px" mr="0.5rem" />
      </Button>
    </Flex> */}
        </Flex>
        <Box
          w="100%"
          bg="red"
          backgroundImage='url("/background.svg")'
          backgroundRepeat="no-repeat"
          backgroundSize="cover"
          backgroundPosition="center center"
          pt={{ base: '100%', lg: '0' }}
          {...(scrolled && scrolledIllustrationProps)}
        />
      </Grid>
    </>
  );
}

export default SplashScreen;
