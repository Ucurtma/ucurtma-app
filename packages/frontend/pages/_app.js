import React from 'react';
import { CSSReset, ThemeProvider } from '@chakra-ui/core';
import { Global } from '@emotion/core';
import App from 'next/app';
import Router from 'next/router';
import trackPageView from '../utils/ga-tag';
import customTheme from '../theme';

/* we're using class because react hooks isn't working in default configure pages yet */

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  // we can't use hooks because of this is next's default app.js file.
  componentDidMount() {
    Router.onRouteChangeComplete = url => {
      trackPageView(url);
    };
  }

  render() {
    const { Component, pageProps } = this.props;
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
              backgroundColor: '#F3F3F3',
            },
          }}
        />
      </ThemeProvider>
    );
  }
}

export default MyApp;
