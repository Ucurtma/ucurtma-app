import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';

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
  let customStyleName = '';
  if (checked && type === 'success') {
    customStyleName = 'success-check-box';
  } else if (checked && type === 'danger') {
    customStyleName = 'danger-check-box';
  }

  return (
    <div className="flex items-center">
      <input
        id={name}
        name={name}
        type="checkbox"
        checked={checked}
        className={cls('default-check-box', customStyleName, className)}
        disabled={disabled}
        onChange={onChange}
        required={required}
        {...otherProps}
      />
      <label
        htmlFor={name}
        className="text-label-color text-base font-normal checkbox-label"
      >
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
  type: '',
  label: '',
};

Checkbox.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
  label: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.oneOf(['success', 'danger']),
};

export default Checkbox;
