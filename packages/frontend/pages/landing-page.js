import AboutUs from '../components/about-us';
import Workflows from '../components/workflows';
import WhyInvest from '../components/why-invest';
import SuccessStories from '../components/success-stories';

function LandingPage() {
  return (
    <>
      <div className="container mx-auto">
        <AboutUs />
      </div>
      <div className="container mx-auto">
        <Workflows />
      </div>
      <div className="container mx-auto">
        <WhyInvest />
      </div>
      <div className="container mx-auto mt-8 sm:mt-24">
        <SuccessStories />
      </div>
    </>
  );
}

export default LandingPage;
