import React from 'react';
import { Global } from '@emotion/core';
import { render } from '@testing-library/react';
import { CSSReset, ThemeProvider } from '@chakra-ui/core';
import { ApolloProvider } from '@apollo/react-hooks';
import customTheme from '../theme';
import client from './apollo';

// eslint-disable-next-line react/prop-types
const AllTheProviders = ({ children }) => {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={customTheme}>
        <CSSReset />
        <Global
          styles={{
            html: {
              fontFamily:
                'Quicksand, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
              fontSize: '18px',
            },
            body: {
              backgroundColor: '#fff',
            },
          }}
        />
        {children}
      </ThemeProvider>
    </ApolloProvider>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
