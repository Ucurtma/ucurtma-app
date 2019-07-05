import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';
import { Field } from 'formik';

function Checkbox({
  name,
  checked,
  type,
  disabled,
  className,
  value,
  label,
  required,
  onChange,
  ...otherProps
}) {
  return (
    <div className="flex items-center">
      <Field
        id={name}
        name={name}
        type="checkbox"
        checked={checked || undefined}
        className={cls(
          'checkbox',
          type === 'danger' ? 'checkbox-danger' : 'checkbox-success',
          className
        )}
        disabled={disabled}
        onChange={onChange}
        required={required}
        {...otherProps}
      />
      <label htmlFor={name} className="text-label-color">
        {label}
        {required && <span className="ml-1">*</span>}
      </label>
    </div>
  );
}

Checkbox.defaultProps = {
  className: '',
  checked: false,
  disabled: false,
  required: false,
  type: 'normal',
  label: '',
};

Checkbox.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
  label: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.oneOf(['normal', 'danger']),
};

export default Checkbox;
