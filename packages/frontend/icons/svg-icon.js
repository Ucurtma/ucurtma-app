import cls from 'classnames';

function SvgIcon({ children, className, viewBox, size, ...otherProps }) {
  const style = size ? { width: size, height: size } : undefined;
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

export default SvgIcon;
