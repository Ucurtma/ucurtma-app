import cls from 'classnames';
import { darken } from 'polished';
import PropTypes from 'prop-types';

function Button({ tag, children, outlined, color, className, ...otherProps }) {
  const Tag = tag;
  return (
    <Tag
      className={cls(
        'button-common',
        { 'button-outlined': outlined },
        className
      )}
      {...otherProps}
    >
      <style jsx>{`
        button {
          border: none;
          margin: 0;
          padding: 0;
          width: auto;
          overflow: visible;
          background: transparent;
          color: inherit;
          font: inherit;
          cursor: pointer;
          font-weight: 600;
        }
        button:focus {
          outline: none;
          box-shadow: 0px 0px 2px blue;
        }
        .button-common {
          padding: 0.75em 1.5rem;
        }
        .button-outlined {
          border: 2px solid ${color};
          color: ${color};
          border-radius: 200px;
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
  outlined: false,
};

Button.propTypes = {
  tag: PropTypes.oneOf(['a', 'button']),
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  color: PropTypes.string,
  outlined: PropTypes.bool,
};

export default Button;
