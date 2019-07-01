import Paragraph from '../ui/paragraph';
import StepTitle from './step-title';

function StepOne() {
  return (
    <div className="flex">
      <div className="px-4 w-full sm:w-6/12">
        <img src="/static/img/plane.png" alt="Signup" />
      </div>
      <StepTitle
        className="px-4"
        step="01"
        title="Welcome to your boarding journey, are you ready?"
      >
        <Paragraph>
          This is first step of creating journey. Before create something, you
          should sign up our awesome website.
        </Paragraph>
      </StepTitle>
    </div>
  );
}

export default StepOne;
