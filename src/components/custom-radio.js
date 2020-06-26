import React from 'react';
import { Button, Box } from '@chakra-ui/core';
import { Circle, CheckCircle } from 'react-feather';

const CustomRadio = React.forwardRef((props, ref) => {
  const { isChecked, isDisabled, children, value, ...rest } = props;
  return (
    <Button
      ref={ref}
      variantColor={isChecked ? 'green' : 'gray'}
      aria-checked={isChecked}
      role="radio"
      isDisabled={isDisabled}
      fontWeight={400}
      {...rest}
    >
      <Box as={isChecked ? CheckCircle : Circle} mr={2} size="16px" />
      {children}
    </Button>
  );
});

export default CustomRadio;
