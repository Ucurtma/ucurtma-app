import cls from 'classnames';
import { darken } from 'polished';
import PropTypes from 'prop-types';

function Button({ tag, children, type, color, className, ...otherProps }) {
  const Tag = tag;

  const buttonType = {
    outlined: 'button-outlined border-2 border-solid',
    flat: 'p-0 m-0',
    bg: 'button-bg',
  };

  return (
    <Tag
      className={cls(
        'font-bold py-3 px-6 rounded-full',
        buttonType[type],
        className
      )}
      {...otherProps}
    >
      <style jsx>{`
        .button-bg {
          background: ${color};
        }
        .button-bg:hover {
          background: ${darken(0.1, color)};
        }
        .button-outlined {
          color: ${color};
        }
        .button-outlined:hover {
          border: 2px solid ${darken(0.1, color)};
          color: ${darken(0.1, color)};
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
  type: 'outlined',
};

Button.propTypes = {
  tag: PropTypes.oneOf(['a', 'button']),
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  color: PropTypes.string,
  type: PropTypes.oneOf(['outlined', 'flat', 'bg']),
};

export default Button;
