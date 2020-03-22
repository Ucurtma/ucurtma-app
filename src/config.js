export const isProduction = window && window.app_env === 'production';

export const gaTrackingId = 'UA-143538110-1';

const config = {
  endpoint: !isProduction
    ? 'https://ucurtma-backend-test.herokuapp.com/graphql'
    : 'https://api.ucurtmaprojesi.com/graphql',
  recaptcha: '6LdMmM0UAAAAAGk0QRoBV06-jmLTPOuj9xo5OTnz',
};

export default config;
