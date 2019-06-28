import React from 'react';
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
  labelClass,
  required,
  onChange,
  ...otherProps
}) {
  function changeValue(targetValue) {
    if (onChange) {
      onChange(targetValue);
    }
  }

  return (
    <div className="flex flex-col">
      <label htmlFor={name} className={cls('mb-1 text-label', labelClass)}>
        {label}
        {required && <span className="ml-1">*</span>}
      </label>
      <input
        id={name} // maybe we can change id with id later, but name should be ok for now.
        name={name}
        type={type}
        className={cls(
          'py-2 px-4 text-lg rounded-lg shadow-light border border-solid border-input color-text-color',
          className
        )}
        disabled={disabled}
        value={value || undefined} // if there is no value props, it means input is uncontrolled.
        onChange={e => changeValue(e.currentTarget.value)}
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
  label: PropTypes.isRequired,
  required: PropTypes.bool,
};

export default Input;
