import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';

function Title({ children, type, className }) {
  const titleType = {
    default: 'm-0 leading-tight text-3xl font-bold text-big-desc',
    small: 'm-0 leading-tight text-2xl font-bold text-big-desc',
  };

  let Tag = 'h1';
  if (type === 'small') Tag = 'h2';

  return <Tag className={cls(titleType[type], className)}>{children}</Tag>;
}

Title.defaultProps = {
  className: '',
  type: 'default',
};

Title.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  type: PropTypes.oneOf(['default', 'small']),
};

export default Title;
