export const isProduction =
  process.env.NODE_ENV === 'prod' || process.argv.ENV === 'prod';

export const gaTrackingId = 'UA-143538110-1';

const config = {
  endpoint: !isProduction
    ? 'https://ucurtma-backend-test.herokuapp.com/graphql'
    : 'https://api.ucurtmaprojesi.com/graphql',
  recaptcha: '6LdMmM0UAAAAAGk0QRoBV06-jmLTPOuj9xo5OTnz',
};

export default config;
