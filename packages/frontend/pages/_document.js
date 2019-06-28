import Document, { Html, Head, Main, NextScript } from 'next/document';

/* we're using class because react hooks isn't working in default configure pages yet */

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          {/* TODO: should we use google fonts? there is advantages and disadvantages of using google fonts but i don't think we have to. */}
          <link
            href="https://fonts.googleapis.com/css?family=Quicksand:400,500,700&display=swap&subset=latin-ext"
            rel="stylesheet"
          />
          <body className="bg-body-bg font-normal font-sans" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
