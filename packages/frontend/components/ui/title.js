import PropTypes from 'prop-types';
import cls from 'classnames';

function Title({ children, className }) {
  return (
    <h1
      className={cls(
        'm-0 leading-tight text-3xl font-bold text-big-desc',
        className
      )}
    >
      {children}
    </h1>
  );
}

Title.defaultProps = {
  className: '',
};

Title.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Title;
