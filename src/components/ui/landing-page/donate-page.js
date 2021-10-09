import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Container from '../container';
import DonateProgress from '../donate-progress';
import LandingPaymentFlow from '../landing-payment-flow';

function DonatePage() {
  const { t } = useTranslation('donate-section');

  return (
    <Container
      maxW={{ base: 'full', sm: 'container.sm', md: 'container.md' }}
      px={{ base: 4, lg: 0 }}
      flexDir="column"
    >
      <Flex m="0 auto" align="center" direction="column" textAlign="center">
        <Heading as="h2" fontSize="2xl">
          {t('title')}
        </Heading>
        <Text maxW={770} mt={8}>
          {t('description')}
        </Text>
      </Flex>
      <Box mt={14}>
        <DonateProgress />
      </Box>
      <Box mt={120} width="full">
        <LandingPaymentFlow />
      </Box>
    </Container>
  );
}

export default DonatePage;
