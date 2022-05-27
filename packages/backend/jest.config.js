const { resolve } = require('path')
const { pathsToModuleNameMapper } = require('ts-jest')
const { compilerOptions } = require('./tsconfig.json')

const root = resolve(__dirname)

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  rootDir: root,
  verbose: true,
  testMatch: ['**/__tests__/**/*test.ts?(x)'],
  clearMocks: true,
  collectCoverage: false,
  testEnvironment: 'node',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/'
  }),
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0
    }
  },

  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/index.ts',
    '!<rootDir>/src/config-aliases.ts',
    '!<rootDir>/src/app.ts',
    '!<rootDir>/src/routes.ts',
    '!<rootDir>/src/db/**',
    '!<rootDir>/src/lib/**',
    '!<rootDir>/src/config/**',
    '!<rootDir>/src/@types/**',
    '!<rootDir>/src/common/**',
    '!<rootDir>/src/schemas/**',
    '!<rootDir>/src/middlewares/*',
    '!<rootDir>/babel.config.js',
    '!<rootDir>/jest.config.js',
    '!<rootDir>/coverage/**',
    '!<rootDir>/__tests__/**'
  ],

  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  modulePathIgnorePatterns: ['<rootDir>/__tests__/helpers']
}
