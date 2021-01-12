import React, { Suspense } from 'react';
import { render } from '@testing-library/react';
import { CSSReset, ThemeProvider } from '@chakra-ui/react';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';
import customTheme from '../theme';
import '../i18n';
import client from './apollo';
import '../global.css';
import { MainContext, mainReducer, mainState } from '../context/main-context';
import Loader from '../components/ui/loader';

const AllTheProviders = ({ children }) => {
  const [state, dispatch] = React.useReducer(mainReducer, mainState);
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={customTheme}>
        <CSSReset />
        <MainContext.Provider value={{ state, dispatch }}>
          <BrowserRouter>
            <Suspense fallback={<Loader isFull />}>{children}</Suspense>
          </BrowserRouter>
        </MainContext.Provider>
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
