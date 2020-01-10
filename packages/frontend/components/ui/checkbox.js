import React from 'react';
import PropTypes from 'prop-types';
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Checkbox,
} from '@chakra-ui/core';
import { useField } from 'formik';

function CheckboxA({ label, type, controlProps, children, ...props }) {
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
      <Checkbox
        aria-label={label || field.name}
        aria-describedby={label || field.name}
        type={type || 'text'}
        errorBorderColor="red.300"
        isInvalid={meta.touched && !!meta.error}
        {...field}
        {...props}
      >
        {children}
      </Checkbox>
      {meta.touched && meta.error ? (
        <FormErrorMessage>{meta.error}</FormErrorMessage>
      ) : null}
    </FormControl>
  );
}

CheckboxA.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  controlProps: PropTypes.string,
  children: PropTypes.node,
};

export default CheckboxA;
