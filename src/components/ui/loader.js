import React from 'react';
import { Box, Spinner } from '@chakra-ui/core';

function Loader({ isFull }) {
  const fullProps = {
    height: 'full',
    alignItems: 'center',
  };
  return (
    <Box
      display="flex"
      width="full"
      justifyContent="center"
      {...(isFull && fullProps)}
    >
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
