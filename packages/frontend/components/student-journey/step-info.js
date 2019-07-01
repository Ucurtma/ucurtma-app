import PropTypes from 'prop-types';
import cls from 'classnames';
import StepTitle from './step-title';

function StepInfo({ img, title, step, children, className }) {
  return (
    <div
      className={cls(
        'flex flex-col sm:flex-row items-center mt-8 sm:mt-32 p-4 sm:p-0',
        className
      )}
    >
      <div className="flex justify-center items-center w-full mb-12 sm:mb-0 sm:w-6/12">
        <img className="pointer-events-none" src={img.path} alt={img.alt} />
      </div>
      <StepTitle step={step} title={title}>
        {children}
      </StepTitle>
    </div>
  );
}

StepInfo.defaultProps = {
  className: '',
};

StepInfo.propTypes = {
  img: PropTypes.shape({
    path: PropTypes.string,
    alt: PropTypes.string,
  }).isRequired,
  step: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default StepInfo;
