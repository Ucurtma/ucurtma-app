export const isProduction = window && window.app_env === 'production';

export const gaTrackingId = 'UA-143538110-1';
const backendUrl = !isProduction
  ? 'https://ucurtma-backend-test.herokuapp.com'
  : 'https://api.ucurtmaprojesi.com';

const config = {
  recaptcha: '6LdMmM0UAAAAAGk0QRoBV06-jmLTPOuj9xo5OTnz',
  backendUrl,
  endpoint: `${backendUrl}/graphql`,
};

export default config;
