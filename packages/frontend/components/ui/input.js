import React from 'react';
import PropTypes from 'prop-types';
import { Text, Input } from '@chakra-ui/core';
import { useField } from 'formik';

function InputA({ label, type, ...props }) {
  const [field, meta] = useField(props);
  return (
    <>
      {label && <Text mb="8px">{label}</Text>}
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
        <Text fontSize="sm" mt={1} color="red.300" className="error">
          {meta.error}
        </Text>
      ) : null}
    </>
  );
}

InputA.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
};

export default InputA;
