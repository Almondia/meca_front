// eslint-disable-next-line @typescript-eslint/no-var-requires
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  collectCoverageFrom: [
    './src/**/*.[jt]s?(x)',
    '!./src/components/@util/**',
    '!./src/components/**/Icon/**',
    '!./src/components/**/Editor/**',
    '!./src/components/**/ImageCropper/**',
    '!./src/components/**/Chart/**',
    '!./src/pages/[_4]*.tsx',
    '!**/*.stories.[jt]s?(x)',
  ],
  coverageReporters: ['text', 'cobertura'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js', 'jest-styled-components'],
  testRegex: '\\.test\\.[jt]sx?$',
  moduleNameMapper: {
    '^@/mock/(.*)$': '<rootDir>/__tests__/__mocks__/msw/$1',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
