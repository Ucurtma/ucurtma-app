import React from 'react';
import { Box } from '@chakra-ui/react';

function Container({ children, ...otherProps }) {
  return (
    <Box
      w="full"
      maxW={{
        base: 'full',
        sm: 'container.sm',
        md: 'container.md',
        lg: 'container.lg',
        xl: 'container.xl',
      }}
      mx="auto"
      display="flex"
      flexWrap="wrap"
      // py={{ md: 4 }}
      {...otherProps}
    >
      {children}
    </Box>
  );
}

export default Container;
