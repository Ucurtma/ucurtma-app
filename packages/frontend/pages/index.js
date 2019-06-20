import Head from "next/head";

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
          body {
            font-family: "Dosis", -apple-system, BlinkMacSystemFont, "Segoe UI",
              Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif,
              "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
              "Noto Color Emoji";
          }
        `}
      </style>
      Welcome to Uçurtma, initial project setup!
    </div>
  );
}

export default Index;
