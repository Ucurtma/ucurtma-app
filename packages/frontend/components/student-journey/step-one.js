import Paragraph from '../ui/paragraph';
import StepTitle from './step-title';
import Signup from '../forms/sign-up';
import Card from '../ui/card';

function StepOne() {
  return (
    <div className="flex">
      <div className="px-4 w-full flex items-center sm:w-6/12">
        <img src="/static/img/plane.png" alt="Signup" />
      </div>
      <div className="w-full sm:w-6/12 px-4 sm:px-0">
        <StepTitle
          fullWidth
          step="01"
          title="Welcome to your boarding journey, are you ready?"
        >
          <Paragraph>
            This is first step of creating journey. Before create something, you
            should sign up our awesome website.
          </Paragraph>
        </StepTitle>
        <Card className="mt-8">
          <Signup />
        </Card>
      </div>
    </div>
  );
}

export default StepOne;
