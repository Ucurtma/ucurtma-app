import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';

function Checkbox({
  name,
  checked,
  isDangerous,
  disabled,
  className,
  value,
  label,
  required,
  onChange,
  ...otherProps
}) {
  function changeValue(targetValue) {
    if (onChange) {
      onChange(targetValue);
    }
  }

  let customStyleName = '';
  if (checked && !isDangerous) {
    customStyleName = 'success-check-box';
  } else if (checked && isDangerous) {
    customStyleName = 'error-check-box';
  }

  return (
    <div className={`flex items-center default-check-box ${customStyleName}`}>
      <input
        id={name}
        name={name}
        type="checkbox"
        checked={checked}
        className={cls(
          'mr-2 w-5 text-lg rounded-lg shadow-light border border-solid border-input',
          className
        )}
        disabled={disabled}
        onChange={e => changeValue(e.currentTarget.checked)}
        required={required}
        {...otherProps}
      />
      <label htmlFor={name} className="text-label-color text-base font-normal">
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
  label: '',
};

Checkbox.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
  label: PropTypes.string,
  required: PropTypes.bool,
};

export default Checkbox;
