/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  // This fixes tests running twice
  testPathIgnorePatterns: [".d.ts", ".js"],
};
