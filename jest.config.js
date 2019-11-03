// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: [`node_modules`, `.cache`, `public`],
  globals: {
    __PATH_PREFIX__: ``,
  },
  testURL: `http://localhost`,
};
