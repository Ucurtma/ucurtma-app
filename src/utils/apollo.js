/* eslint-disable no-console */
import { ApolloClient, ApolloLink, createHttpLink } from '@apollo/client';
import { InMemoryCache } from '@apollo/client/cache';
import { onError } from '@apollo/client/link/error';
import LogRocket from 'logrocket';
import config from '../config';

const httpLink = createHttpLink({
  uri: config.endpoint,
  credentials: 'same-origin',
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) => {
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          );
          LogRocket.captureMessage(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          );
        });
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    httpLink,
  ]),
});

export default client;
