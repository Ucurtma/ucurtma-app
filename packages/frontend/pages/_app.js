import React from 'react';
import { CSSReset, ThemeProvider } from '@chakra-ui/core';
import { Global } from '@emotion/core';
import Router from 'next/router';
import trackPageView from '../utils/ga-tag';
import customTheme from '../theme';

Router.events.on('routeChangeComplete', path => trackPageView(path));

// eslint-disable-next-line react/prop-types
function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={customTheme}>
      <CSSReset />
      <Component {...pageProps} />
      <Global
        styles={{
          html: {
            fontFamily:
              'Quicksand, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
          },
          body: {
            backgroundColor: '#fff',
          },
        }}
      />
    </ThemeProvider>
  );
}

export default MyApp;
