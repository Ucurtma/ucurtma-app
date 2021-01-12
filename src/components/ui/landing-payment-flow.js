import { Box, Heading, Text } from '@chakra-ui/core';
import React from 'react';
import { AlertTriangle } from 'react-feather';
import LandingPayment from './landing-payment';

function LandingPaymentFlow() {
  return (
    <>
      <Heading as="h2" fontSize="lg">
        Destek Yöntemleri
      </Heading>
      <Text maxW={754} mt={2}>
        Uçurtma gençlerine destekte bulunabilmeniz için aşağıdaki ödeme
        yöntemlerini kullanabilirsiniz.
      </Text>
      <Box
        border="1px solid"
        borderColor="green.400"
        color="green.400"
        borderRadius="11px"
        w="full"
        maxW="472px"
        d="inline-flex"
        alignItems="center"
        px={6}
        py={3}
        mt={3}
      >
        <Box mr={3} as={AlertTriangle} />
        Destek oluşturmak için lütfen bir yöntem seçiniz.
      </Box>
      <LandingPayment />
    </>
  );
}
export default LandingPaymentFlow;
