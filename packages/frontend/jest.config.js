module.exports = {
  setupFilesAfterEnv: ['@testing-library/react/cleanup-after-each'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
};
