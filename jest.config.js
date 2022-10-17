const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleFileExtensions: ['js', 'jsx'],
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!@emurgo/cardano-serialization-lib-asmjs/.*)',
  ],
};

module.exports = createJestConfig(customJestConfig);
