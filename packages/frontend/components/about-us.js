import Paragraph from './ui/paragraph';
import Button from './ui/button';
import Title from './ui/title';

function AboutUs() {
  return (
    <div className="pt-12 sm:pt-32 flex justify-start">
      <div className="w-full p-4 sm:w-2/5 sm:p-0">
        <div className="mb-10">
          <h2 className="m-0 leading-tight text-2xl font-bold text-text-color">
            For People,
          </h2>
          <Title>From People.</Title>
        </div>
        <Paragraph className="border-l border-solid border-text-color pl-3 mb-10">
          We’re creating something beautiful, something wonderful. So, I can’t
          explain it as a front-end developer for now but I guess there will
          something good that writed by marketing team am I right?
        </Paragraph>
        {/* TODO: add link here */}
        <Button color="#6F6F6F">LEARN MORE</Button>
      </div>
      <div className="hidden sm:block w-3/5 text-center">
        {/*
            TODO: Using PNG in here isn't make sense,
            We should create a SVG file later.
            Today, I am using a illustrator that downloaded from dribbble.
            I will change it later.
          */}
        <img
          className="pointer-events-none -z-1"
          src="static/img/about-us.png"
          alt="About Us"
        />
      </div>
    </div>
  );
}

export default AboutUs;
