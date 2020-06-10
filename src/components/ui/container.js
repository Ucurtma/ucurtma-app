import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@chakra-ui/core';

function Container({ children, ...otherProps }) {
  return (
    <Box
      w="full"
      maxW={{
        base: 'full',
        md: 'containers.md',
        lg: 'containers.lg',
        xl: 'containers.xl',
      }}
      mx="auto"
      display="flex"
      flexWrap="wrap"
      py={{ md: 4 }}
      {...otherProps}
    >
      {children}
    </Box>
  );
}

Container.propTypes = {
  children: PropTypes.node,
};

export default Container;
