import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';

function Title({ children, variant, className }) {
  const titleType = {
    normal: 'text-3xl',
    small: 'text-2xl',
  };

  let Tag = 'h1';
  if (variant === 'small') Tag = 'h2';

  return (
    <Tag
      className={cls(
        'm-0 leading-tight font-bold text-big-desc',
        titleType[variant],
        className
      )}
    >
      {children}
    </Tag>
  );
}

Title.defaultProps = {
  className: '',
  variant: 'normal',
};

Title.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['normal', 'small']),
};

export default Title;
