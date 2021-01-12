import { Text, Box } from '@chakra-ui/core';
import React from 'react';

function ValueRenderer({ title, value, ...otherProps }) {
  return (
    <Box {...otherProps}>
      <Text fontWeight={400}>{title}</Text>
      <Text fontWeight={700}>{value}TRYB</Text>
    </Box>
  );
}

export default ValueRenderer;
