/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  coverageDirectory: 'coverage',
  clearMocks: true,
  coveragePathIgnorePatterns: ['/node_modules/'],
  collectCoverage: true,
  testEnvironment: 'node',
};
