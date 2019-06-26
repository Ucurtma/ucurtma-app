import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';

function SvgIcon({
  children,
  className,
  viewBox,
  size,
  noSize,
  ...otherProps
}) {
  const style = noSize
    ? undefined
    : { width: `${size}px`, height: `${size}px` };
  return (
    <svg
      className={cls(
        'select-none inline-block fill-current flex-shrink: 0',
        className
      )}
      viewBox={viewBox || '0 0 24 24'}
      style={style}
      {...otherProps}
    >
      {children}
    </svg>
  );
}

SvgIcon.defaultProps = {
  size: '24',
  noSize: false,
};

SvgIcon.propTypes = {
  size: PropTypes.string,
  noSize: PropTypes.bool,
};

export default SvgIcon;
