import React from 'react';
import App, { Container } from 'next/app';
import Router from 'next/router';
import '../styles/global.css';
import trackPageView from '../utils/ga-tag';
import Header from '../components/header';

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
      <Container>
        <div className="container mx-auto mt-8">
          <Header />
        </div>
        <Component {...pageProps} />
      </Container>
    );
  }
}

export default MyApp;
