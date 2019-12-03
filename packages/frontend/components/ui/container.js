import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@chakra-ui/core';

function Container({ children, ...otherProps }) {
  return (
    <Box
      width={{
        base: '100%',
        sm: 'containers.sm',
        md: 'containers.md',
        lg: 'containers.lg',
        xl: 'containers.xl',
      }}
      mx="auto"
      mt={12}
      p={4}
      display="flex"
      flexWrap="wrap"
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
