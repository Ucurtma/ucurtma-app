module.exports = {
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
    '<rootDir>/out/',
  ],
  moduleDirectories: ['node_modules', 'utils'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    'jest.config.js',
    'theme.js',
    '/coverage/',
    '/out/',
  ],
  collectCoverageFrom: ['./**/*.js'],
};
