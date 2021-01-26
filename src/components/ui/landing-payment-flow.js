import { Box, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import LandingPayment from './landing-payment';

function LandingPaymentFlow() {
  const { t } = useTranslation('donate-section');

  return (
    <>
      <Heading as="h2" fontSize="lg">
        {t('methods')}
      </Heading>
      <Text maxW={754} mt={2}>
        {t('methodsDesc')}
      </Text>
      <Box mt={4}>
        <LandingPayment />
      </Box>
    </>
  );
}
export default LandingPaymentFlow;
