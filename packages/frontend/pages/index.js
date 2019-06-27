import Head from 'next/head';
import LandingPage from './landing-page';
import '../styles/normalize.css';
import '../styles/global.css';

function Index() {
  return (
    <div>
      <Head>
        <title>Uçurtma</title>
        {/* TODO: should we use google fonts? there is advantages and disadvantages of using google fonts but i don't think we have to. */}
        <link
          href="https://fonts.googleapis.com/css?family=Quicksand:400,500,700&display=swap&subset=latin-ext"
          rel="stylesheet"
        />
        <body className="bg-body-bg font-normal font-sans" />
      </Head>
      <LandingPage />
    </div>
  );
}

export default Index;
