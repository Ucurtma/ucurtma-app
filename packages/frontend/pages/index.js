import Head from 'next/head';
import '../normalize.css';
import LandingPage from './landing-page';

function Index() {
  return (
    <div>
      <Head>
        <title>Uçurtma</title>
        <link
          href="https://fonts.googleapis.com/css?family=Quicksand:400,500,700&display=swap&subset=latin-ext"
          rel="stylesheet"
        />
      </Head>
      <style global jsx>
        {`
          :root {
            --text-color: #6f6f6f;
            --title-color: #4f4f4f;
            --navbar-link: #111d27;
            --body-bg: #f3f3f3;
            --card-bg: #f7f7f7;
            --shadow: 0 0 24px rgba(155, 201, 255, 0.24);
          }
          body {
            font-family: 'Quicksand', -apple-system, BlinkMacSystemFont,
              'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans',
              sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
              'Segoe UI Symbol', 'Noto Color Emoji';
            font-weight: 400;
            background: var(--body-bg);
            margin: 0;
          }
          .container {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            margin-right: auto;
            margin-left: auto;
            padding: 0 1em;
          }

          @media (min-width: 576px) {
            .container {
              max-width: 540px;
            }
          }

          @media (min-width: 768px) {
            .container {
              max-width: 720px;
            }
          }

          @media (min-width: 992px) {
            .container {
              max-width: 960px;
            }
          }

          @media (min-width: 1200px) {
            .container {
              max-width: 1140px;
            }
          }
        `}
      </style>
      <LandingPage />
    </div>
  );
}

export default Index;
