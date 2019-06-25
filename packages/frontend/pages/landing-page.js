import Header from '../components/header';
import AboutUs from '../components/about-us';
import Workflows from '../components/workflows';
import WhyInvest from '../components/why-invest';
import Testimonials from '../components/testimonials';

function LandingPage() {
  return (
    <>
      <div className="container mx-auto mt-8">
        <Header />
      </div>
      <div className="container mx-auto">
        <AboutUs />
      </div>
      <div className="container mx-auto">
        <Workflows />
      </div>
      <div className="container mx-auto">
        <WhyInvest />
      </div>
      <div className="container mx-auto mt-24">
        <Testimonials />
      </div>
    </>
  );
}

export default LandingPage;
