const {defaults} = require('jest-config');
// const prepare = require('./webpack.config');


module.exports = {
  "setupTestFrameworkScriptFile": "jest-extended",
  "preset": "ts-jest",
  "transform": {
    "^.+\\.vue$": "vue-jest"
  },
  "snapshotSerializers": [
    "<rootDir>/node_modules/jest-serializer-vue"
  ],
  "testEnvironment": "jsdom",
  "testMatch": [
    "<rootDir>/src/**/__tests__/**/*.ts?(x)",
    "<rootDir>/src/**/?(*.)+(spec|test).ts?(x)",
    "<rootDir>/test/**/?(*.)+(spec|test).ts?(x)"
  ],
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "vue"
  ],
  "coveragePathIgnorePatterns": [
    "/node_modules/",
    "/test/",
    "environment.ts"
  ],
  "coverageThreshold": {
    "global": {
      "branches": 90,
      "functions": 95,
      "lines": 95,
      "statements": 95
    }
  },
  "collectCoverage": true,
  "collectCoverageFrom": [
    "src/**/*.{js,ts,vue}"
  ],
  "globals": {
    "vue-jest": {
      // "babelConfig": ".babelrc",
      "tsConfig": "<rootDir>/tsconfig.json"
    },
    "ts-jest": {
      "diagnostics": true,
      // "skipBabel": true,
      "tsConfig": "<rootDir>/tsconfig.json"
    }
  }
}
