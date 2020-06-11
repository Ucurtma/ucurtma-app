import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import { ApolloProvider } from '@apollo/react-hooks';
import './i18n';
import App from './App';
import customTheme from './theme';
import './global.css';
import * as serviceWorker from './serviceWorker';
import client from './utils/apollo';

const Application = (
  <ApolloProvider client={client}>
    <ThemeProvider theme={customTheme}>
      <CSSReset />
      <App />
    </ThemeProvider>
  </ApolloProvider>
);

ReactDOM.render(Application, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
