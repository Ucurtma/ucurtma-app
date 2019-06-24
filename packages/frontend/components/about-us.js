import Paragraph from './paragraph';
import Button from './button';

function AboutUs() {
  return (
    <div className="about-us">
      <style jsx>
        {`
          .about-us {
            padding-top: 137px;
            display: flex;
            justify-content: flex-start;
          }

          .about-us .content {
            width: 40%;
          }

          .about-us .illustration {
            width: 60%;
            text-align: center;
          }

          .content .title h1,
          .content .title h2 {
            margin: 0;
          }

          .content .title h2 {
            color: var(--text-color);
          }

          .content .title h1 {
            color: var(--big-desc);
          }

          .content .title {
            margin-bottom: 2.5rem;
          }

          div :global(.content .description) {
            border-left: 1px solid var(--text-color);
            padding-left: 0.625rem;
            margin-bottom: 2.5rem;
          }
        `}
      </style>
      <div className="content">
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
      <div className="illustration">
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

export default AboutUs;
