import React from 'react';
import PropTypes from 'prop-types';
import { PseudoBox } from '@chakra-ui/core';

function Card({ children, paddingType, ...otherProps }) {
  const paddingTypes = {
    default: { px: { lg: 10, base: 6 }, py: { lg: 8, base: 4 } },
    none: { px: 0, py: 0 },
  };

  return (
    <PseudoBox
      bg="white"
      borderRadius="md"
      boxShadow="cardLight"
      border="1px solid #eee"
      py={paddingTypes[paddingType].py}
      px={paddingTypes[paddingType].px}
      mx={{ base: 4, md: 0 }}
      _hover={{ boxShadow: 'cardLightHover' }}
      transition="0.2s ease all"
      {...otherProps}
    >
      {children}
    </PseudoBox>
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
