import { Text, Box } from '@chakra-ui/react';
import React from 'react';

function ValueRenderer({ title, value, withCurrency = true }) {
  return (
    <Box
      mt="4"
      border="1px"
      borderColor="green.100"
      borderRadius="11px"
      p="4"
      boxShadow="cardLight"
    >
      <Text color="green.400" fontSize="sm" fontWeight="600">
        {title}
      </Text>
      <Text fontSize="2xl" fontWeight="700">
        {`${value.toLocaleString('tr-TR')}${withCurrency ? ' TRYB' : ''}`}
      </Text>
    </Box>
  );
}

export default ValueRenderer;
