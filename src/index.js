import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import './i18n';
import App from './App';
import * as serviceWorker from './serviceWorker';
import customTheme from './theme';
import './global.css';

const Application = (
  <ThemeProvider theme={customTheme}>
    <CSSReset />
    <App />
  </ThemeProvider>
);

ReactDOM.render(Application, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
