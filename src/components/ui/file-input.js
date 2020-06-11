import React from 'react';
import PropTypes from 'prop-types';
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  VisuallyHidden,
  Flex,
  Button,
  IconButton,
} from '@chakra-ui/core';
import { useField, useFormikContext } from 'formik';
import { Upload, Edit, X } from 'react-feather';

function FileInput({
  label,
  type,
  controlProps,
  customName,
  withOutline,
  onDelete,
  ...props
}) {
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
        <FormLabel color="gray.600" htmlFor={field.name}>
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
        disabled={field.disabled}
        onChange={e => setFieldValue(field.name, e.currentTarget.files[0])}
        {...props}
      />
      <Flex flexDirection="column">
        <FormLabel htmlFor={field.name} pr={0}>
          <Button
            as="span"
            variant={withOutline ? 'outline' : 'ghost'}
            leftIcon={field.value ? Edit : Upload}
            color={field.value ? 'danger' : 'linkBlue'}
            size="md"
            justifyContent="flex-start"
            cursor="pointer"
            width={withOutline ? 'full' : 'inherit'}
          >
            {field.value
              ? field.value.name || customName
              : `Upload ${label || field.name}`}
            {field.value && (
              <IconButton
                ml="auto"
                data-testid="delete-button"
                icon={X}
                variant="link"
                onClick={e =>
                  onDelete
                    ? onDelete(field, e.currentTarget.parentElement.textContent)
                    : setFieldValue(field.name, '')
                }
                aria-label="Cancel"
              />
            )}
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
  withOutline: PropTypes.bool,
  customName: PropTypes.string,
  onDelete: PropTypes.func,
};

export default FileInput;
