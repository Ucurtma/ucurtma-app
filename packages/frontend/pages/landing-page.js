import Header from '../components/header';
import Paragraph from '../components/paragraph';

function LandingPage() {
  return (
    <div>
      <Header />
      <div className="container">
        <style jsx>
          {`
            .about-us,
            .about-illustration {
              width: 50%;
            }
          `}
        </style>
        <div className="about-us">
          <h3>For People,</h3>
          <h2>From People.</h2>
          <Paragraph>
            We’re creating something beautiful, something wonderful. So, I can’t
            explain it as a front-end developer for now but I guess there will
            something good that writed by marketing team am I right?
          </Paragraph>
        </div>
        <div className="about-illustration">illustration</div>
      </div>
    </div>
  );
}

export default LandingPage;
