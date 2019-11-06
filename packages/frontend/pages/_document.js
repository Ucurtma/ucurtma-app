/* eslint-disable react/no-danger */
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { gaTrackingId } from '../utils/ga-tag';

/* we're using class because react hooks isn't working in default configure pages yet */
class MyDocument extends Document {
  static async getInitialProps(ctx) {
    // check if in production
    const isProduction = process.env.NODE_ENV === 'production';
    const initialProps = await Document.getInitialProps(ctx);
    // pass isProduction flag back through props
    return { ...initialProps, isProduction };
  }

  setGoogleTags = () => {
    return {
      __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', ${gaTrackingId});
      `,
    };
  };

  render() {
    const { isProduction } = this.props;
    return (
      <Html>
        <Head>
          {/* todo: should we use google fonts? there is advantages and disadvantages of using google fonts but i don't think we have to. */}
          <link
            href="https://fonts.googleapis.com/css?family=Quicksand:400,500,700&display=swap&subset=latin-ext"
            rel="stylesheet"
          />
          <title>Uçurtma</title>
        </Head>
        <body>
          <Main />
          <NextScript />
          {isProduction && (
            <>
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${gaTrackingId}`}
              />
              {/* We call the function above to inject the contents of the script tag */}
              <script dangerouslySetInnerHTML={this.setGoogleTags()} />
            </>
          )}
        </body>
      </Html>
    );
  }
}

export default MyDocument;
