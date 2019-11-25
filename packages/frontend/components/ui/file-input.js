import React from 'react';
import PropTypes from 'prop-types';
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  VisuallyHidden,
  Flex,
  Button,
} from '@chakra-ui/core';
import { useField, useFormikContext } from 'formik';
import { Upload, Edit } from 'react-feather';

function FileInput({ label, type, controlProps, ...props }) {
  const [field, meta] = useField(props);
  const { setFieldValue } = useFormikContext();
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
      <VisuallyHidden
        as="input"
        aria-label={label || field.name}
        aria-describedby={label || field.name}
        type="file"
        errorBorderColor="red.300"
        id={field.name}
        isInvalid={meta.touched && !!meta.error}
        name={field.name}
        onBlur={field.onBlur}
        onChange={e => setFieldValue(field.name, e.currentTarget.files[0])}
        {...props}
      />
      <Flex flexDirection="column">
        <FormLabel htmlFor={field.name}>
          <Button
            as="span"
            variant="ghost"
            leftIcon={field.value ? Edit : Upload}
            color={field.value ? 'danger' : 'linkBlue'}
            size="sm"
          >
            {field.value ? field.value.name : `Upload ${label || field.name}`}
          </Button>
        </FormLabel>
        {meta.touched && meta.error ? (
          <FormErrorMessage>{meta.error}</FormErrorMessage>
        ) : null}
      </Flex>
    </FormControl>
  );
}

FileInput.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  controlProps: PropTypes.string,
};

export default FileInput;
