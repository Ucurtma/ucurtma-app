import React from 'react';
import { Box } from '@chakra-ui/react';

function Card({ children, paddingType, ...otherProps }) {
  const paddingTypes = {
    default: { px: { lg: 10, base: 6 }, py: { lg: 8, base: 4 } },
    none: { px: 0, py: 0 },
  };

  return (
    <Box
      bg="white"
      borderRadius="md"
      boxShadow="cardLight"
      border="1px solid #eee"
      py={paddingTypes[paddingType].py}
      px={paddingTypes[paddingType].px}
      _hover={{ boxShadow: 'cardLightHover' }}
      transition="0.2s ease all"
      {...otherProps}
    >
      {children}
    </Box>
  );
}

Card.defaultProps = {
  paddingType: 'none',
};

export default Card;
