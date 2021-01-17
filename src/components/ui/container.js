import React from 'react';
import { Container as ChakraContainer } from '@chakra-ui/react';

function Container({ children, ...otherProps }) {
  return (
    <ChakraContainer
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
      {...otherProps}
    >
      {children}
    </ChakraContainer>
  );
}

export default Container;
