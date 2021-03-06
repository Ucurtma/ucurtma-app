import React from 'react';
import { render } from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { ApolloProvider } from '@apollo/client';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import 'dayjs/locale/tr';
import './intl/i18n';
import App from './App';
import customTheme from './theme';
import * as serviceWorker from './serviceWorker';
import client from './utils/apollo';

dayjs.locale('tr');
dayjs.extend(utc);

const Application = (
  <ApolloProvider client={client}>
    <ChakraProvider theme={customTheme}>
      <App />
    </ChakraProvider>
  </ApolloProvider>
);

render(Application, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
