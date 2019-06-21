import cls from 'classnames';

function SvgIcon({ children, className, viewBox, ...otherProps }) {
  return (
    <svg
      className={cls('icon', className)}
      viewBox={viewBox || '0 0 24 24'}
      {...otherProps}
    >
      <style jsx>
        {`
          .icon {
            user-select: none;
            min-height: 2rem;
            min-width: 2rem;
            display: inline-block;
            fill: currentColor;
            flex-shrink: 0;
          }
        `}
      </style>
      {children}
    </svg>
  );
}

export default SvgIcon;
