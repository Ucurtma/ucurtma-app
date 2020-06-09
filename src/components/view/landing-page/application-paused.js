/* eslint-disable no-useless-escape */
import React from 'react';
import { Box, Text } from '@chakra-ui/core';

function ApplicationPaused() {
  return (
    <Box
      pl={{ base: 8, md: 12 }}
      pr={{ base: 8, md: 12 }}
      pb={{ base: 8, md: 12 }}
      bg="white"
    >
      <Box mt={8} alignItems="center">
        <Text textAlign="center">
          Gerekli çalışmaları tamamlayana kadar öğrenci başvurularına ara vermiş
          bulunmaktayız.
        </Text>
        <Text textAlign="center">İlginiz için teşekkür ederiz.</Text>
      </Box>
    </Box>
  );
}

export default ApplicationPaused;
