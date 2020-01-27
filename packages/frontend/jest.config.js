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
    'next.config.js',
    'theme.js',
    '/coverage/',
    '/out/',
  ],
  moduleNameMapper: {
    '\\.(css|scss)$': '<rootDir>/__tests__/styleMock.js',
  },
  collectCoverageFrom: ['./**/*.js'],
};
