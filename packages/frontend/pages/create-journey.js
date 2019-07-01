import React, { useState } from 'react';
import IntroduceSteps from '../components/student-journey/introduce-steps';
import Header from '../components/header';
import Button from '../components/ui/button';

function CreateJourney() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="container mx-auto mt-8">
      <Header />
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
    </div>
  );
}

export default CreateJourney;
