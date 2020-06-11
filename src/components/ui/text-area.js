import React from 'react';
import {
  Textarea as ChakraTextArea,
  FormErrorMessage,
  FormLabel,
  FormControl,
} from '@chakra-ui/core';
import { useField } from 'formik';

function Textarea({ label, type, controlProps, ...props }) {
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
      <ChakraTextArea
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

export default Textarea;
