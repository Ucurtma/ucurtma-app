import React from 'react';
import { Global } from '@emotion/core';
import { render } from '@testing-library/react';
import { CSSReset, ThemeProvider } from '@chakra-ui/core';
import customTheme from '../theme';

// eslint-disable-next-line react/prop-types
const AllTheProviders = ({ children }) => {
  return (
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
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
