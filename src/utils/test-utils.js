import React from 'react';
import { render } from '@testing-library/react';
import { CSSReset, ThemeProvider } from '@chakra-ui/core';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';
import customTheme from '../theme';
import '../i18n';
import client from './apollo';
import '../global.css';
import { MainContext, mainReducer, mainState } from '../context/main-context';

const AllTheProviders = ({ children }) => {
  const [state, dispatch] = React.useReducer(mainReducer, mainState);
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={customTheme}>
        <CSSReset />
        <MainContext.Provider value={{ state, dispatch }}>
          <BrowserRouter>{children}</BrowserRouter>
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
