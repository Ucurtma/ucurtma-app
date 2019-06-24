import Header from '../components/header';
import AboutUs from '../components/about-us';

function LandingPage() {
  return (
    <>
      <div className="container mx-auto mt-8">
        <Header />
      </div>
      <div className="container mx-auto">
        <AboutUs />
      </div>
    </>
  );
}

export default LandingPage;
