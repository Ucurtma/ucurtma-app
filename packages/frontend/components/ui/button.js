import React from 'react';
import cls from 'classnames';
import PropTypes from 'prop-types';

function Button({
  tag,
  children,
  type,
  className,
  color,
  textColor,
  style,
  isSubmit,
  noPadding,
  ...otherProps
}) {
  const Tag = tag;

  const buttonType = {
    outlined: 'text-default-button border-2 border-solid',
    flat: 'button-flat p-0 m-0 text-navbar-link',
    bg: 'bg-default-button text-navbar-link',
  };

  let customStyle = {
    border: `2px solid ${color}`,
    color: textColor || color,
  };

  if (type === 'flat') {
    customStyle = {
      color: textColor,
    };
  }

  if (type === 'custom') {
    customStyle = {
      background: color,
      color: textColor || '#111d27',
    };
  }

  return (
    <Tag
      className={cls(
        'font-bold text-sm sm:text-base rounded-full',
        noPadding ? 'py-0 sm:py-0 px-0' : 'py-2 sm:py-3 px-6',
        buttonType[type],
        className
      )}
      type={isSubmit ? 'submit' : 'button'}
      style={color || textColor ? { ...customStyle, ...style } : undefined}
      {...otherProps}
    >
      {children}
    </Tag>
  );
}

Button.defaultProps = {
  tag: 'button',
  className: '',
  textColor: '',
  color: '',
  type: 'outlined',
  isSubmit: false,
  noPadding: false,
};

Button.propTypes = {
  tag: PropTypes.oneOf(['a', 'button']),
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  color: PropTypes.string,
  textColor: PropTypes.string,
  type: PropTypes.oneOf(['outlined', 'flat', 'bg', 'custom']),
  isSubmit: PropTypes.bool,
  noPadding: PropTypes.bool,
};

export default Button;
