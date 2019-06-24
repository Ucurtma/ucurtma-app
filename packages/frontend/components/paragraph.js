import PropTypes from 'prop-types';
import cls from 'classnames';

function Paragraph({ children, type, className }) {
  const fontType = {
    xs: 'font-small',
    normal: 'font-normal',
    lg: 'font-big',
  };

  return (
    <p className={cls(fontType[type], 'paragraph', className)}>
      <style jsx>
        {`
          .paragraph {
            color: var(--text-color);
          }
          .font-small {
            font-size: 1rem;
            line-height: 1.5rem;
          }
          .font-normal {
            font-size: 1.125rem;
            line-height: 1.75rem;
          }
          .font-big {
            font-size: 1.25rem;
            line-height: 2rem;
          }
        `}
      </style>
      {children}
    </p>
  );
}

Paragraph.defaultProps = {
  children: '',
  type: 'normal',
  className: '',
};

Paragraph.propTypes = {
  children: PropTypes.node,
  type: PropTypes.oneOf(['xs', 'normal', 'lg']),
  className: PropTypes.string,
};

export default Paragraph;
