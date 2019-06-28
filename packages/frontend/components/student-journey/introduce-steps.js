import Title from '../ui/title';
import Paragraph from '../ui/paragraph';
import StepInfo from './step-info';

function IntroduceSteps() {
  const steps = [
    {
      step: '01',
      img: {
        path: 'static/img/step-01-signup.png',
        alt: 'Sign up',
      },
      title: 'Sign up and introduce your self to us.',
      children: (
        <Paragraph>
          I have nothing to say nice and shiny but I guess our marketing guy has
          something. Just a one thing, you have to create account to use our
          awesome website because... come on. Do you really need an explanation?
        </Paragraph>
      ),
    },
    {
      step: '02',
      img: {
        path: 'static/img/step-02-upload.png',
        alt: 'Upload Documents',
      },
      className: 'flex-row-reverse',
      title: 'Upload documents, Verify yourself.',
      children: (
        <>
          <Paragraph className="mb-4">
            Why we need verification? I guess our users should know why and I am
            sure that they will want know why. Uploading ID cards can be hard
            for some of us.
          </Paragraph>

          <Paragraph>
            Did you know: our citizenship numbers were breached three or more
            years ago. Nevermind, we will create a good explanation for you.
            This is just a lorem ipsum that writed by designer.
          </Paragraph>
        </>
      ),
    },
    {
      step: '03',
      img: {
        path: 'static/img/step-03-wait-for-approval.png',
        alt: 'Wait for Approval',
      },
      title: 'Wait for approval.',
      children: (
        <Paragraph>
          I have nothing to say nice and shiny but I guess our marketing guy has
          something. Just a one thing, you have to create account to use our
          awesome website because... come on. Do you really need an explanation?
        </Paragraph>
      ),
    },
  ];
  return (
    <div>
      <Title type="small" className="w-full mt-6 sm:mt-18 sm:w-5/12">
        Hey! Let me intruduce our journey steps before you start!
      </Title>
      {steps.map(step => (
        <StepInfo
          key={step.step}
          img={step.img}
          step={step.step}
          title={step.title}
          className={step.className || ''}
        >
          {step.children}
        </StepInfo>
      ))}
    </div>
  );
}

export default IntroduceSteps;
