import React from 'react';
import { Box } from '@chakra-ui/core';

function CampaignContentBox({ children, ...otherProps }) {
  return (
    <Box
      bg="gray.50"
      borderRadius="4px"
      p={4}
      maxW={{ base: '100%' }}
      ml={{ base: 0, lg: 8 }}
      mt={{ base: 4, lg: 0 }}
      mb={8}
      border="1px solid"
      borderColor="gray.200"
      boxShadow="0 0 3px rgba(45,55,72,0.1)"
      {...otherProps}
    >
      {children}
    </Box>
  );
}

export default CampaignContentBox;
