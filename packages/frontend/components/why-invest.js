import Paragraph from './ui/paragraph';
import Button from './ui/button';
import Title from './ui/title';

function WhyInvest() {
  return (
    <div className="pt-32 flex">
      <div className="w-2/6">
        <div className="mb-10">
          <Title>Why Invest?</Title>
        </div>
        <Paragraph className="border-l border-solid border-text-color pl-3 mb-10">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In iaculis
          leo arcu, quis placerat risus sodales eget. Phasellus ut turpis
          consequat, laoreet lectus eu, cursus sem. Etiam vestibulum efficitur
          vehicula.
        </Paragraph>
        {/* TODO: add link here */}
        <Button color="#6F6F6F">READ MORE</Button>
      </div>
      <div className="w-4/6 text-center">
        {/*
        TODO: Using PNG in here isn't make sense,
        We should create a SVG file later.
        Today, I am using a illustrator that downloaded from dribbble.
        I will change it later.
      */}
        <img src="static/about-us.png" alt="About Us" />
      </div>
    </div>
  );
}

export default WhyInvest;
