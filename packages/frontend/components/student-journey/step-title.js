import PropTypes from 'prop-types';
import cls from 'classnames';
import Title from '../ui/title';

function StepTitle({ step, title, children, fullWidth, className }) {
  return (
    <div className={cls('w-full', !fullWidth && 'sm:w-6/12', className)}>
      <h4 className="font-bold">STEP {step}</h4>
      <Title
        className="mb-4 w-6/12 uc-onboarding-journey-step-title"
        variant="xs"
      >
        {title}
      </Title>
      {children}
    </div>
  );
}

StepTitle.defaultProps = {
  children: undefined,
  className: '',
  fullWidth: false,
};

StepTitle.propTypes = {
  step: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
  fullWidth: PropTypes.bool,
};

export default StepTitle;
