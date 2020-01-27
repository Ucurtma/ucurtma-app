export const isDevelopment = process.env.NODE_ENV === 'development';

const config = {
  endpoint: isDevelopment
    ? 'https://ucurtma-backend-test.herokuapp.com/graphql'
    : 'https://api.ucurtmaprojesi.com/graphql',
  recaptcha: '6LdMmM0UAAAAAGk0QRoBV06-jmLTPOuj9xo5OTnz',
};

export default config;
