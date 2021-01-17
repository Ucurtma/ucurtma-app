/* eslint-disable no-console */
import { ApolloClient, ApolloLink } from '@apollo/client';
import { InMemoryCache } from '@apollo/client/cache';
import { onError } from '@apollo/client/link/error';
import { createUploadLink } from 'apollo-upload-client';
import LogRocket from 'logrocket';
import config from '../config';

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
    // eslint-disable-next-line new-cap
    new createUploadLink({
      uri: config.endpoint, // Server URL (must be absolute)
      credentials: 'same-origin',
      fetch,
    }),
  ]),
});

export default client;
