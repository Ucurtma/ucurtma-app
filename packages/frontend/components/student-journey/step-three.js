import React from 'react';
import Link from 'next/link';
import StepTitle from './step-title';
import Paragraph from '../ui/paragraph';
import Button from '../ui/button';

function StepThree() {
  return (
    <div className="flex flex-col items-center">
      <img
        className="sm:max-w-md mb-8"
        src="/static/img/step-03-wait-for-approval.png"
        alt="Success"
      />
      <StepTitle step="03" title="Wait and prepare for a war.">
        <Paragraph className="mb-4">
          You did awesome things until this step. Now, Its our turn. Our team
          and automated systems will look your documents. After everything is
          ok, they will verify your account.
        </Paragraph>
        <Paragraph>
          We will send you an email after your account verified. If you want to
          continue now, you can create “draft campaign.”
        </Paragraph>
      </StepTitle>
      <div className="flex justify-center my-4 sm:p-0">
        <Link href="/">
          <Button variant="custom" textColor="#E56666">
            <a>Go to homepage</a>
          </Button>
        </Link>
        <div className="flex justify-center my-4 sm:p-0">
          <Button variant="custom" color="#FCFCFC">
            CREATE DRAFT
          </Button>
        </div>
      </div>
    </div>
  );
}

export default StepThree;
