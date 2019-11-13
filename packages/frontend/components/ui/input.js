import React from 'react';
import PropTypes from 'prop-types';
import {
  Input,
  FormErrorMessage,
  FormLabel,
  FormControl,
} from '@chakra-ui/core';
import { useField } from 'formik';

function InputA({ label, type, ...props }) {
  const [field, meta] = useField(props);
  return (
    <FormControl isInvalid={meta.error && meta.touched}>
      {label && <FormLabel>{label}</FormLabel>}
      <Input
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

InputA.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
};

export default InputA;
