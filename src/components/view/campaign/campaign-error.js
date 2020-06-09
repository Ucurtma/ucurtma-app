import React from 'react';
import {
  Flex,
  Alert,
  Icon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/core';
import { AlertCircle } from 'react-feather';
import Header from '../../ui/header';
import Container from '../../ui/container';
import LandingFooter from '../landing-page/footer';

function CampaignError() {
  return (
    <Flex flexDir="column" justify="space-between" height="full">
      <Header withLogo hideMenu />
      <Container display="block" h="full" p="2rem 0">
        <Alert
          w="full"
          h="full"
          bg="gray.50"
          color="gray.400"
          justifyContent="center"
          flexDir="column"
        >
          <Icon as={AlertCircle} fontSize="4rem" color="gray.300" mb={4} />
          <AlertTitle mr={2}>Bir sorun oluştu.</AlertTitle>
          <AlertDescription textAlign="center">
            Biz bu sorunu düzeltmek için çalışırken, lütfen daha sonra tekrar
            deneyin.
          </AlertDescription>
        </Alert>
      </Container>
      <LandingFooter />
    </Flex>
  );
}

export default CampaignError;
