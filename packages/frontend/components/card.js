import PropTypes from 'prop-types';

function Card({ title, icon, children }) {
  const Icon = icon;
  return (
    <div className="bg-card-bg shadow px-6 py-10 rounded-2 min-h-100 min-w-190">
      <div className="flex items-end">
        {icon && <Icon className="mr-9 w-52 h-52" />}
        <h2 className="m-0 text-title-color">{title}</h2>
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
};

Card.propTypes = {
  icon: PropTypes.node,
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
};

export default Card;
