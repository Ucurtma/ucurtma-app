import React from 'react';
import {
  NumberInput as ChakraInput,
  NumberInputField,
  FormErrorMessage,
  FormLabel,
  FormControl,
  InputRightAddon,
  InputLeftAddon,
} from '@chakra-ui/core';
import { useField } from 'formik';

function NumberInput({ label, type, controlProps, addon, ...props }) {
  const [field, meta] = useField(props);
  return (
    <FormControl
      width="100%"
      isInvalid={meta.error && meta.touched}
      mb={4}
      {...controlProps}
    >
      {label && (
        <FormLabel color="paragraph" htmlFor={field.name}>
          {label}
        </FormLabel>
      )}
      <ChakraInput>
        {addon?.left && (
          <InputLeftAddon roundedRight="0">{addon.left}</InputLeftAddon>
        )}
        <NumberInputField
          aria-label={label || field.name}
          aria-describedby={label || field.name}
          type={type || 'text'}
          errorBorderColor="red.300"
          isInvalid={meta.touched && !!meta.error}
          roundedRight={addon?.right && 0}
          roundedLeft={addon?.left && 0}
          {...props}
          {...field}
        />
        {addon?.right && (
          <InputRightAddon roundedLeft="0">{addon.right}</InputRightAddon>
        )}
      </ChakraInput>
      {meta.touched && meta.error ? (
        <FormErrorMessage>{meta.error}</FormErrorMessage>
      ) : null}
    </FormControl>
  );
}

export default NumberInput;
