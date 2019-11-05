module.exports = {
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    'jest.config.js',
    'theme.js',
    '/coverage/',
  ],
  collectCoverageFrom: ['./**/*.js'],
};
