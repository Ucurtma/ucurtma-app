import { Box, Heading, Text } from '@chakra-ui/react';
import React from 'react';
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
      <Box mt={4}>
        <LandingPayment />
      </Box>
    </>
  );
}
export default LandingPaymentFlow;
