/* eslint-disable prefer-destructuring */
import { createBreakpoints } from '@chakra-ui/theme-tools';
import { extendTheme } from '@chakra-ui/react';

const breakpoints = createBreakpoints({
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  xxl: '1920px',
});

const customTheme = extendTheme({
  styles: {
    global: () => ({
      body: {
        backgroundColor: 'white',
        fontWeight: 400,
      },
      'html, body': {
        height: '100%',
      },
    }),
  },
  breakpoints,
  components: {
    Button: {
      baseStyle: {
        borderRadius: 11,
      },
      sizes: {
        lg: {
          h: 14,
          fontSize: 16,
          px: 7,
        },
      },
    },
  },
  fonts: {
    body:
      'Poppins, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    heading:
      'Poppins, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  },
  shadows: {
    cardLight: '0 0 24px rgba(45, 55, 72, 0.1)',
    cardLightHover: '0 0 12px rgba(45, 55, 72, 0.1)',
    modernSmall: '0px 0px 4px rgba(196, 196, 196, 0.24)',
    modern: '0px 0px 13px rgba(196, 196, 196, 0.45)',
    modernOrange: '0px 0px 13px rgba(255, 149, 5, 0.45)',
    modernBlue: '0px 0px 13px rgba(5, 135, 255, 0.45)',
  },
  colors: {
    orange: {
      50: '#f9f4e2',
      100: '#faedbb',
      200: '#f7e37e',
      300: '#f2cf3b',
      400: '#ecb213',
      500: '#FF9505',
      600: '#d96c05',
      700: '#ba5109',
      800: '#9a400f',
      900: '#803511',
    },
    blue: {
      50: '#f6fbfd',
      100: '#e5f8fd',
      200: '#beeafb',
      300: '#92d5fa',
      400: '#56adf9',
      500: '#0587FF',
      600: '#1a5cf1',
      700: '#1948d7',
      800: '#1537a3',
      900: '#122c7c',
    },
    primaryButton: '#DAF888',
    divider: '#F8F8F8',
    title: '#4f4f4f',
    danger: '#F88888',
    lime: {
      50: '#f5fede',
      100: '#e6fab4',
      200: '#d6f587',
      300: '#c6f159',
      400: '#b6ed2c',
      500: '#9dd312',
      600: '#7aa40a',
      700: '#567504',
      800: '#324600',
      900: '#0f1800',
    },
  },
});

export default customTheme;
