import React, { Suspense } from 'react';
import { render } from '@testing-library/react';
import { CSSReset, ThemeProvider } from '@chakra-ui/react';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';
import customTheme from '../theme';
import '../i18n';
import client from './apollo';
import Loader from '../components/ui/loader';
import { StoreProvider } from '../context/global-state';

const AllTheProviders = ({ children }) => {
  return (
    <StoreProvider>
      <ApolloProvider client={client}>
        <ThemeProvider theme={customTheme}>
          <CSSReset />
          <BrowserRouter>
            <Suspense fallback={<Loader isFull />}>{children}</Suspense>
          </BrowserRouter>
        </ThemeProvider>
      </ApolloProvider>
    </StoreProvider>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
