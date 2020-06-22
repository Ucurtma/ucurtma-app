import React from 'react';
import {
  Flex,
  Alert,
  Icon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/core';
import { AlertCircle } from 'react-feather';
import Container from '../../ui/container';

function CampaignError() {
  return (
    <Flex flexDir="column" justify="space-between" height="full">
      <Container display="block" h="full">
        <Alert
          w="full"
          h="full"
          bg="gray.50"
          color="gray.400"
          justifyContent="center"
          flexDir="column"
          borderRadius="4px"
          p={8}
        >
          <Icon as={AlertCircle} fontSize="4rem" color="gray.300" mb={4} />
          <AlertTitle mr={2}>Bir sorun oluştu.</AlertTitle>
          <AlertDescription textAlign="center">
            Sorunu düzeltmek için çalışıyoruz. Lütfen daha sonra tekrar deneyin.
          </AlertDescription>
        </Alert>
      </Container>
    </Flex>
  );
}

export default CampaignError;
