import React, { useState } from 'react';
import IntroduceSteps from '../components/student-journey/introduce-steps';
import Header from '../components/header';
import Button from '../components/ui/button';
import StepOne from '../components/student-journey/step-one';

function CreateJourney() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <div className="container mx-auto mt-8">
      <Header />
      <div className="mt-6 p-4 sm:p-0 sm:mt-18">
        {activeStep === 0 && (
          <>
            <IntroduceSteps />
            <div className="flex justify-center my-12 p-4 sm:p-0">
              <Button
                onClick={() => setActiveStep(1)}
                type="custom"
                color="#FCFCFC"
              >
                CONTINUE
              </Button>
            </div>
          </>
        )}
        {activeStep === 1 && <StepOne />}
      </div>
    </div>
  );
}

export default CreateJourney;
