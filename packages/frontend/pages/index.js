import React from 'react';
import Link from 'next/link';
import { Grid, Box, Icon, Flex, Heading, Text, Button } from '@chakra-ui/core';
// import { Navigation } from 'react-feather';

function Home() {
  return (
    <Grid
      height="100vh"
      templateColumns={{
        base: 'inherit',
        md: '50% auto',
        lg: '40% auto',
        xl: '30% auto',
      }}
      templateRows={{
        base: 'auto 30%',
        sm: 'auto 50%',
        md: 'inherit',
      }}
    >
      <Flex
        mt={{ base: '2rem', md: '3rem' }}
        ml={{ base: '2rem', md: '6rem' }}
        mr={{ base: '2rem', md: '0' }}
        mb={{ base: '2rem', md: '10rem' }}
        flexDir="column"
        justifyContent={{ md: 'space-between' }}
        bg="red"
      >
        <Link href="/">
          <a id="logo">
            <Icon name="logo" size="4rem" />
          </a>
        </Link>
        <Box pr={{ base: '0', md: '3rem' }} mt={{ base: '4rem', md: '0' }}>
          <Heading maxW="253px" lineHeight="1" color="gray.900">
            İnsanlardan, insanlara.
          </Heading>
          <Text mt="1.5rem" color="gray.500">
            Daha iyi bir dünya yaratmak için birbirimize ihtiyacımız var.
            Uçurtma, bizi birbirimize daha kolay ulaştırmak için var.
          </Text>
          <Button
            float="right"
            variant="ghost"
            mt="1rem"
            rightIcon="arrow-forward"
            color="gray.500"
          >
            Nasıl çalışıyor?
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
      />
    </Grid>
  );
}

export default Home;
