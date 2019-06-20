import Head from "next/head";
import Card from "../components/card";
import "../normalize.css";

function Index() {
  return (
    <div>
      <Head>
        <title>Uçurtma</title>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Dosis:400,600,700&display=swap&subset=latin-ext"
        />
      </Head>
      <style global jsx>
        {`
          :root {
            --text-color: #6f6f6f;
            --body-bg: #f3f3f3;
            --shadow: 0 0 36px rgba(155, 201, 255, 0.16);
          }
          body {
            font-family: "Dosis", -apple-system, BlinkMacSystemFont, "Segoe UI",
              Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif,
              "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
              "Noto Color Emoji";
            background: var(--body-bg);
            margin: 0;
          }
        `}
      </style>
      Welcome to Uçurtma, initial project setup!
      <Card>There will be card</Card>
    </div>
  );
}

export default Index;
