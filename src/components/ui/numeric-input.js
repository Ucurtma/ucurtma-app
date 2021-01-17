import React from 'react';
import {
  NumberInput as ChakraInput,
  NumberInputField,
  FormErrorMessage,
  FormLabel,
  FormControl,
  InputRightAddon,
  InputLeftAddon,
  Box,
  InputGroup,
} from '@chakra-ui/react';
import { useField } from 'formik';

function NumberInput({
  label,
  description,
  type,
  controlProps,
  addon,
  isDisabled,
  ...props
}) {
  const [field, meta, helpers] = useField(props);
  return (
    <FormControl
      width="100%"
      isInvalid={meta.error && meta.touched}
      mb={4}
      isDisabled={isDisabled}
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
      <InputGroup w="full">
        {addon?.left && (
          <InputLeftAddon roundedRight="0">{addon.left}</InputLeftAddon>
        )}
        <ChakraInput w="full">
          <NumberInputField
            aria-label={label || field.name}
            aria-describedby={label || field.name}
            type={type || 'text'}
            errorBorderColor="red.300"
            roundedRight={addon?.right && 0}
            roundedLeft={addon?.left && 0}
            {...field}
            {...props}
            onChange={e => {
              field.onChange(e);
              helpers.setTouched(true);
            }}
          />
        </ChakraInput>
        {addon?.right && (
          <InputRightAddon roundedLeft="0">{addon.right}</InputRightAddon>
        )}
      </InputGroup>
      {meta.touched && meta.error ? (
        <FormErrorMessage>{meta.error}</FormErrorMessage>
      ) : null}
    </FormControl>
  );
}

export default NumberInput;
