import cls from 'classnames';
import PropTypes from 'prop-types';

function Card({ title, icon, children, className }) {
  const Icon = icon;
  return (
    <div
      className={cls(
        'bg-card-bg shadow px-6 py-10 rounded-2 min-h-100 min-w-190',
        className
      )}
    >
      <div className="flex items-end">
        {icon && <Icon className="mr-9 w-52 h-52" />}
        <h2 className="m-0 text-title-color text-2xl font-bold">{title}</h2>
      </div>
      {children && (
        <div className="mt-6 text-lg leading-relaxed">{children}</div>
      )}
    </div>
  );
}

Card.defaultProps = {
  icon: '',
  children: '',
  className: '',
};

Card.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Card;
