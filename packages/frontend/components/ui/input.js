import React from 'react';
import { Field } from 'formik';
import PropTypes from 'prop-types';
import cls from 'classnames';

// TODO: choose a form-validation component for input.

function Input({
  name,
  type,
  disabled,
  className,
  value,
  label,
  errors,
  labelClass,
  required,
  onChange,
  ...otherProps
}) {
  return (
    <div className="flex flex-col mb-4">
      <label
        htmlFor={name}
        className={cls(
          'mb-1',
          errors ? 'text-danger' : 'text-label',
          labelClass
        )}
      >
        {label}
        {required && <span className="ml-1">*</span>}
      </label>
      <Field
        id={name} // maybe we can change id with id later, but name should be ok for now.
        name={name}
        type={type}
        className={cls(
          'py-2 px-4 text-lg rounded-lg shadow-light border border-solid color-text-color',
          errors ? 'border-danger' : 'border-input',
          className
        )}
        disabled={disabled}
        value={value || undefined}
        onChange={onChange} // i guess giving onChange as a function isn't ok for formik.
        required={required}
        {...otherProps}
      />
    </div>
  );
}

Input.defaultProps = {
  className: '',
  value: '',
  disabled: false,
  required: false,
};

Input.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  value: PropTypes.string,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
};

export default Input;
