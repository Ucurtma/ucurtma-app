import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { createUploadLink } from 'apollo-upload-client';
import config from '../config';

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        );
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    // eslint-disable-next-line new-cap
    new createUploadLink({
      uri: config.endpoint, // Server URL (must be absolute)
      credentials: 'same-origin',
      fetch,
    }),
  ]),
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'ignore',
    },
  },
  cache: new InMemoryCache(),
});

export default client;
