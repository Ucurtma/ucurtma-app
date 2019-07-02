import StepTitle from './step-title';
import Paragraph from '../ui/paragraph';
import Card from '../ui/card';

function StepTwo() {
  return (
    <div className="flex flex-col">
      <div className="w-full sm:w-6/12 px-4 sm:px-0">
        <StepTitle
          fullWidth
          step="02"
          title="Upload documents, Verify yourself."
        >
          <Paragraph>
            You can prove yourself with any of bellow documents. You can use ID
            card, Driving Licence or... Select ones.
          </Paragraph>
        </StepTitle>
      </div>
      <Card className="mt-8">
        {/* todo: make drag n drop and file upload */}
      </Card>
    </div>
  );
}

export default StepTwo;
