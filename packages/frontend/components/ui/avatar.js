import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';

function Avatar({ type, className, image }) {
  const avatarType = {
    xs: 'w-8 h-8',
    normal: 'w-11 h-11',
    lg: 'w-14 h-14',
  };

  return (
    <div
      className={cls(
        avatarType[type],
        'flex align-center justify-center overflow-hidden',
        className
      )}
    >
      {image ? (
        <img
          className="bg-no-repeat bg-center bg-contain rounded-full"
          src={image}
          alt="noopener norefferer"
        />
      ) : (
        <div className={cls(avatarType[type], 'bg-text-color', className)} />
      )}
    </div>
  );
}

Avatar.defaultProps = {
  image: '',
  type: 'normal',
  className: '',
};

Avatar.propTypes = {
  type: PropTypes.oneOf(['xs', 'normal', 'lg']),
  image: PropTypes.string,
  className: PropTypes.string,
};

export default Avatar;
