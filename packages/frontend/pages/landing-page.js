import Header from '../components/header';
import AboutUs from '../components/about-us';
import Workflows from '../components/workflows';

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
    </>
  );
}

export default LandingPage;
