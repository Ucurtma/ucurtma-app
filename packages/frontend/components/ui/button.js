import React from 'react';
import cls from 'classnames';
import PropTypes from 'prop-types';

const Button = React.forwardRef(function Button(
  {
    tag,
    children,
    variant,
    className,
    color,
    textColor,
    style,
    noPadding,
    disabled,
    type,
    ...otherProps
  },
  ref
) {
  const Tag = tag;
  const hasColor = color || textColor;

  const buttonType = {
    outlined: 'text-default-button border-2 border-solid',
    flat: 'button-flat p-0 m-0 text-navbar-link',
    bg: 'bg-default-button text-navbar-link',
  };

  const customStyles = {
    outlined: {
      border: `2px solid ${color}`,
      color: textColor || color,
    },
    flat: {
      color: textColor,
    },
    custom: {
      background: color,
      color: textColor || '#111d27',
    },
  };

  return (
    <Tag
      ref={ref}
      className={cls(
        'ui-button font-bold text-sm sm:text-base rounded-full',
        noPadding ? 'py-0 sm:py-0 px-0' : 'py-2 sm:py-3 px-6',
        buttonType[variant],
        className
      )}
      type={type}
      style={
        !disabled && hasColor
          ? { ...customStyles[variant], ...style }
          : undefined
      }
      disabled={disabled}
      {...otherProps}
    >
      {children}
    </Tag>
  );
});

Button.defaultProps = {
  tag: 'button',
  className: '',
  textColor: '',
  color: '',
  variant: 'outlined',
  noPadding: false,
  disabled: false,
  style: {},
  type: 'button',
};

Button.propTypes = {
  tag: PropTypes.oneOf(['a', 'button']),
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  color: PropTypes.string,
  textColor: PropTypes.string,
  variant: PropTypes.oneOf(['outlined', 'flat', 'bg', 'custom']),
  style: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ),
  type: PropTypes.string,
  noPadding: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default Button;
