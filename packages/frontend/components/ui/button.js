import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@chakra-ui/core';

function ButtonA({ buttonType, fullWidth, children, ...otherProps }) {
  const types = {
    primary: { bg: 'primaryButton', fontWeight: 'regular', size: 'lg' },
  };
  return (
    <Button
      width={fullWidth ? '100%' : 'inherit'}
      bg={types[buttonType].bg}
      fontWeight={types[buttonType].fontWeight}
      size={types[buttonType].size}
      {...otherProps}
    >
      {children}
    </Button>
  );
}

ButtonA.defaultProps = {
  buttonType: 'primary',
  fullWidth: true,
};

ButtonA.propTypes = {
  buttonType: PropTypes.oneOf(['primary']),
  fullWidth: PropTypes.bool,
  children: PropTypes.node,
};

export default ButtonA;
