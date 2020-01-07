import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@chakra-ui/core';

function Card({ children, paddingType, ...otherProps }) {
  const paddingTypes = {
    default: { px: { lg: 10, base: 6 }, py: { lg: 8, base: 4 } },
    none: { px: 0, py: 0 },
  };

  return (
    <Box
      w="100%"
      bg="gray.100"
      borderRadius="md"
      boxShadow="cardLight"
      py={paddingTypes[paddingType].py}
      px={paddingTypes[paddingType].px}
      {...otherProps}
    >
      {children}
    </Box>
  );
}

Card.defaultProps = {
  paddingType: 'none',
};

Card.propTypes = {
  children: PropTypes.node,
  paddingType: PropTypes.oneOf(['default', 'none']),
};

export default Card;
