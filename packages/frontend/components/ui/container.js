import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@chakra-ui/core';

function Container({ children, ...otherProps }) {
  return (
    <Box
      width={{
        base: 'containers.base',
        sm: 'containers.sm',
        md: 'containers.md',
        lg: 'containers.lg',
        xl: 'containers.lg',
      }}
      mx="auto"
      mt={12}
      p={4}
      display="flex"
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
