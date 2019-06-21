import PropTypes from 'prop-types';
import cls from 'classnames';

function Card({ title, icon, children }) {
  const Icon = icon;
  return (
    <div className={cls('card')}>
      <style jsx>
        {`
          .card {
            background: var(--card-bg);
            box-shadow: var(--shadow);
            padding: 1.5rem 2rem;
            border-radius: 2rem;
            min-height: 100px;
            min-width: 190px;
          }
          .card-header {
            display: flex;
            align-items: flex-end;
          }
          .card-icon {
            margin-right: 2.125rem;
            width: 52px;
            height: 52px;
          }
          .card-title {
            margin: 0;
            color: var(--title-color);
          }
          .card-content {
            margin-top: 1.5rem;
            font-size: 1.125rem;
            line-height: 1.65rem;
          }
        `}
      </style>
      <div className="card-header">
        {icon && <Icon className="card-icon" />}
        <h2 className="card-title">{title}</h2>
      </div>
      {children && <div className="card-content">{children}</div>}
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
