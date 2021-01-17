import { Text, Box } from '@chakra-ui/react';
import React from 'react';

function ValueRenderer({ title, value, ...otherProps }) {
  return (
    <Box {...otherProps}>
      <Text fontSize={{ base: 'sm', md: 'md' }} fontWeight={400}>
        {title}
      </Text>
      <Text fontSize={{ base: 'sm', md: 'md' }} fontWeight={700}>
        {value.toLocaleString('tr-TR')} TRYB
      </Text>
    </Box>
  );
}

export default ValueRenderer;
