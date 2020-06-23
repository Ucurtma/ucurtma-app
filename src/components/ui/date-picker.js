import React, { useState } from 'react';
import {
  VisuallyHidden,
  Input,
  Select,
  FormErrorMessage,
  FormLabel,
  FormControl,
  Stack,
} from '@chakra-ui/core';
import { useField, useFormikContext } from 'formik';
import moment from 'moment';
import 'moment/locale/tr';

moment.locale('tr');

function DatePicker({ label, type, controlProps, ...props }) {
  const [field, meta] = useField(props);
  const [valueChange, setValueChange] = useState(false);
  const [value, setValue] = useState(moment());
  const [dateValues, setDateValues] = useState({
    date: undefined,
    month: undefined,
    year: undefined,
  });
  const allChanged =
    !!dateValues.date && !!dateValues.month && !!dateValues.year;
  const { setFieldValue, setFieldTouched } = useFormikContext();

  const years = back => {
    const year = new Date().getFullYear();
    return Array.from({ length: back }, (v, i) => year - back + i + 1);
  };
  const months = moment.months();
  const days = Array.from(Array(32).keys()).slice(1);

  const handleSelect = (e, dateType) => {
    const inputValue = e.currentTarget.value;
    const date = dateType === 'date' ? inputValue : dateValues.date;
    const month =
      dateType === 'month'
        ? parseInt(inputValue, 10) + 1
        : dateValues.month + 1;
    const year = dateType === 'year' ? inputValue : dateValues.year;
    const isValid = moment(`${date}-${month}-${year}`, 'DD-MM-YYYY').isValid();
    setFieldTouched(field.name);

    if (inputValue) {
      setDateValues({ ...dateValues, [dateType]: parseInt(inputValue, 10) });
      if (date && month && year) {
        setValue(value.set(dateType, inputValue));
        if (isValid) {
          setFieldValue(field.name, value);
        } else {
          setFieldValue(field.name, 'invalidDate');
        }
      } else {
        setFieldValue(field.name, 'notChanged');
      }
    } else {
      setDateValues({ ...dateValues, [dateType]: '' });
      setFieldValue(field.name, '');
    }

    setValueChange(!valueChange);
  };

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
        as={Input}
        aria-label={label || field.name}
        aria-describedby={label || field.name}
        type={type || 'text'}
        errorBorderColor="red.300"
        isInvalid={meta.touched && !!meta.error}
        {...field}
        {...props}
        readOnly
        value={allChanged ? value && value.format('DD.MM.YYYY') : ''}
      />
      <Stack isInline>
        <Select
          placeholder="Gün"
          value={dateValues.date}
          onChange={e => handleSelect(e, 'date')}
          onBlur={() => setFieldTouched(field.name, true, false)}
        >
          {days.map(day => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </Select>
        <Select
          placeholder="Ay"
          value={dateValues.month}
          onChange={e => handleSelect(e, 'month')}
          onBlur={() => setFieldTouched(field.name, true, false)}
        >
          {months.map((month, monthIndex) => (
            <option key={month} value={monthIndex}>
              {month}
            </option>
          ))}
        </Select>
        <Select
          placeholder="Yıl"
          value={dateValues.year}
          onChange={e => handleSelect(e, 'year')}
          onBlur={() => setFieldTouched(field.name, true, false)}
        >
          {years(121)
            .reverse()
            .map(year => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
        </Select>
      </Stack>
      {meta.touched && meta.error ? (
        <FormErrorMessage>{meta.error}</FormErrorMessage>
      ) : null}
    </FormControl>
  );
}

export default DatePicker;
