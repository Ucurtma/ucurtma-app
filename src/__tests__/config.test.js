/* eslint-disable global-require */
let config;

describe('Config Tests', () => {
  afterEach(() => {
    global.window.app_env = undefined;
    jest.resetModules();
  });

  test('backendUrl should be look for production api if window.app_env is production', () => {
    global.window.app_env = 'production';
    config = require('../config');
    expect(config.isProduction).toBeTruthy();
    expect(config.default.backendUrl).toEqual(config.productionAPIURL);
  });

  test('backendUrl should be look for development api if window.app_env is undefined', () => {
    config = require('../config');
    expect(config.isProduction).toBeFalsy();
    expect(config.default.backendUrl).toEqual(config.testAPIURL);
  });

  test('backendUrl should be look for development api if window.app_env is something other than production', () => {
    config = require('../config');
    expect(config.isProduction).toBeFalsy();
    expect(config.default.backendUrl).toEqual(config.testAPIURL);
  });
});
