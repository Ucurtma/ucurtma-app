import React from 'react';
import { Button } from '@chakra-ui/core';

function ButtonA({ buttonType, fullWidth, children, ...otherProps }) {
  const types = {
    primary: { bg: 'primaryButton', fontWeight: 'regular', size: 'lg' },
  };
  return (
    <Button
      data-testid="button"
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

export default ButtonA;
