import PropTypes from 'prop-types';
import cls from 'classnames';

function Paragraph({ children, type, className }) {
  const fontType = {
    xs: 'text-base leading-normal',
    normal: 'text-lg leading-relaxed',
    lg: 'text-xl leading-loose',
  };

  return (
    <p className={cls(fontType[type], 'text-text-color', className)}>
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
