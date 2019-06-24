import Header from '../components/header';
import Paragraph from '../components/paragraph';
import Button from '../components/button';

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

            .title h1,
            .title h2 {
              margin: 0;
            }

            .title h2 {
              color: var(--text-color);
            }

            .title h1 {
              color: var(--big-desc);
            }

            .title {
              margin-bottom: 2rem;
            }

            div :global(.description) {
              border-left: 1px solid var(--text-color);
              padding-left: 0.625rem;
              margin-bottom: 2rem;
            }
          `}
        </style>
        <div className="about-us">
          <div className="title">
            <h2>For People,</h2>
            <h1>From People.</h1>
          </div>
          <Paragraph className="description">
            We’re creating something beautiful, something wonderful. So, I can’t
            explain it as a front-end developer for now but I guess there will
            something good that writed by marketing team am I right?
          </Paragraph>
          <Button color="#6F6F6F" outlined>
            LEARN MORE
          </Button>
        </div>
        <div className="about-illustration">illustration</div>
      </div>
    </div>
  );
}

export default LandingPage;
