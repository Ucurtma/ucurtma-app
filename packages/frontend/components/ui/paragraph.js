import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';

function Paragraph({ children, variant, className }) {
  const fontType = {
    xs: 'text-base leading-normal',
    normal: 'text-lg leading-relaxed',
    lg: 'text-xl leading-loose',
  };

  return (
    <p className={cls(fontType[variant], 'text-text-color', className)}>
      {children}
    </p>
  );
}

Paragraph.defaultProps = {
  children: '',
  variant: 'normal',
  className: '',
};

Paragraph.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(['xs', 'normal', 'lg']),
  className: PropTypes.string,
};

export default Paragraph;
