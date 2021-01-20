import React from 'react';
import { Box } from '@chakra-ui/react';

function CampaignContentBox({ children, ...otherProps }) {
  return (
    <Box
      borderRadius="4px"
      p={4}
      maxW={{ base: '100%' }}
      mt={{ base: 4, lg: 0 }}
      mb={8}
      border="1px solid"
      borderColor="gray.100"
      boxShadow="modernSmall"
      {...otherProps}
    >
      {children}
    </Box>
  );
}

export default CampaignContentBox;
