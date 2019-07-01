import PropTypes from 'prop-types';
import cls from 'classnames';
import Title from '../ui/title';

function StepTitle({ step, title, children, className }) {
  return (
    <div className={cls('w-full sm:w-6/12', className)}>
      <h4>STEP {step}</h4>
      <Title className="mb-4 w-6/12" type="small">
        {title}
      </Title>
      {children}
    </div>
  );
}

StepTitle.defaultProps = {
  children: undefined,
  className: '',
};

StepTitle.propTypes = {
  step: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
};

export default StepTitle;
