import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@chakra-ui/core';

function Card({ children, paddingType, ...otherProps }) {
  const paddingTypes = {
    default: { px: 8, py: 10 },
    none: { px: 0, py: 0 },
  };

  return (
    <Box
      w="100%"
      bg="white"
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
  paddingType: PropTypes.oneOf(['default']),
};

export default Card;
