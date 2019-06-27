import React from 'react';
import cls from 'classnames';
import { darken } from 'polished';
import PropTypes from 'prop-types';

function Button({
  tag,
  children,
  type,
  color,
  className,
  textColor,
  ...otherProps
}) {
  const Tag = tag;

  const buttonType = {
    outlined: 'button-outlined border-2 border-solid',
    flat: 'button-flat p-0 m-0',
    bg: 'button-bg',
  };

  return (
    <Tag
      className={cls(
        'font-bold text-sm sm:text-base py-2 sm:py-3 px-6 rounded-full',
        buttonType[type],
        className
      )}
      {...otherProps}
    >
      {/* TODO: Change hex colors with css variables.
        Also, change style jsx with tailwind.
        Style jsx adds <style> tag to body everytime that you use button in somewhere.
        If you use 4 buttons, body has 4 style.
      */}
      <style jsx>{`
        .button-flat {
          color: ${textColor || '#111d27'};
        }
        .button-flat:hover {
          color: ${darken(0.1, textColor || '#111d27')};
        }
        .button-bg {
          background: ${color};
          color: ${textColor || '#111d27'};
        }
        .button-bg:hover {
          background: ${darken(0.1, color)};
          color: ${darken(0.1, textColor || '#111d27')};
        }
        .button-outlined {
          color: ${textColor || color};
        }
        .button-outlined:hover {
          border: 2px solid ${darken(0.1, textColor || color)};
          color: ${darken(0.1, textColor || color)};
        }
      `}</style>
      {children}
    </Tag>
  );
}

Button.defaultProps = {
  tag: 'button',
  className: '',
  color: '#39baba',
  textColor: '',
  type: 'outlined',
};

Button.propTypes = {
  tag: PropTypes.oneOf(['a', 'button']),
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  color: PropTypes.string,
  textColor: PropTypes.string,
  type: PropTypes.oneOf(['outlined', 'flat', 'bg']),
};

export default Button;
