import Header from '../components/header';
import AboutUs from '../components/about-us';

function LandingPage() {
  return (
    <div>
      <Header />
      <div className="container">
        <AboutUs />
      </div>
    </div>
  );
}

export default LandingPage;
