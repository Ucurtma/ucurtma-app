import React from 'react';
import {
  Input as ChakraInput,
  FormErrorMessage,
  FormLabel,
  FormControl,
  Box,
} from '@chakra-ui/core';
import { useField } from 'formik';

function Input({ label, type, controlProps, description, ...props }) {
  const [field, meta] = useField(props);

  return (
    <FormControl
      width="100%"
      isInvalid={meta.error && meta.touched}
      mb={4}
      {...controlProps}
    >
      {label && (
        <FormLabel color="gray.600" htmlFor={field.name}>
          {label}
        </FormLabel>
      )}
      {description && (
        <Box color="gray.400" mb={4} fontSize="0.9rem">
          {description}
        </Box>
      )}
      <ChakraInput
        aria-label={label || field.name}
        aria-describedby={label || field.name}
        type={type || 'text'}
        errorBorderColor="red.300"
        isInvalid={meta.touched && !!meta.error}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <FormErrorMessage>{meta.error}</FormErrorMessage>
      ) : null}
    </FormControl>
  );
}

export default Input;
