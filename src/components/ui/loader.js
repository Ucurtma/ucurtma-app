import React from 'react';
import { Box, Spinner } from '@chakra-ui/core';

function Loader() {
  return (
    <Box my={12} mx="auto">
      <Spinner
        thickness="4px"
        speed="0.75s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Box>
  );
}

export default Loader;
