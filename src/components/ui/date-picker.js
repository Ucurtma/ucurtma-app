import React from 'react';
import {
  Input as ChakraInput,
  FormErrorMessage,
  FormLabel,
  FormControl,
} from '@chakra-ui/core';
import { useField, useFormikContext } from 'formik';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import tr from 'date-fns/locale/tr';
import moment from 'moment';

registerLocale('tr', tr);

const DatePickerInput = React.forwardRef(
  (
    { value, onClick, label, type, controlProps, field, meta, ...props },
    ref
  ) => {
    console.log(props);
    return (
      <FormControl
        width="100%"
        isInvalid={meta.error && meta.touched}
        mb={4}
        ref={ref}
        {...controlProps}
      >
        {label && (
          <FormLabel color="gray.600" htmlFor={field.name}>
            {label}
          </FormLabel>
        )}
        {/* <ChakraInput value={value} onClick={onClick} /> */}
        <ChakraInput
          aria-label={label || field.name}
          aria-describedby={label || field.name}
          type={type || 'text'}
          errorBorderColor="red.300"
          isInvalid={meta.touched && !!meta.error}
          {...field}
          {...props}
          readOnly
          value={value && moment(value).format('DD.MM.YYYY')}
        />
        {meta.touched && meta.error ? (
          <FormErrorMessage>{meta.error}</FormErrorMessage>
        ) : null}
      </FormControl>
    );
  }
);

function DatePicker({ ...props }) {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(props);
  const { placeholder, isReadOnly } = props;
  return (
    <ReactDatePicker
      {...field}
      {...props}
      selected={(field.value && new Date(field.value)) || null}
      placeholderText={placeholder}
      onChange={val => setFieldValue(field.name, val)}
      dateFormat="yyyy-MM-dd'T'HH:mm:ss.SSSxxx" // sending iso format to input
      customInput={
        <DatePickerInput
          label="Doğum Tarihi"
          field={field}
          meta={meta}
          isReadOnly={isReadOnly}
        />
      }
      locale="tr"
    />
  );
}

export default DatePicker;
