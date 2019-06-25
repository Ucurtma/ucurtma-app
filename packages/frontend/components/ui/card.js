import cls from 'classnames';
import PropTypes from 'prop-types';

function Card({ title, icon, children, noPadding, className }) {
  const Icon = icon;
  return (
    <div
      className={cls(
        'bg-card-bg shadow rounded-2 min-h-100 min-w-190',
        noPadding ? 'px-0 py-0' : 'px-6 py-10',
        className
      )}
    >
      {title && (
        <div className="flex items-end">
          {icon && <Icon className="mr-9 w-52 h-52" />}
          {title && (
            <h2 className="m-0 text-title-color text-2xl font-bold">{title}</h2>
          )}
        </div>
      )}
      {children}
    </div>
  );
}

Card.defaultProps = {
  icon: '',
  children: '',
  className: '',
  noPadding: false,
};

Card.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
  noPadding: PropTypes.bool,
};

export default Card;
