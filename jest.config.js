const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig');

module.exports ={
   

    collectCoverageFrom: [
        "src/services/**/*.ts",
    ],

    coverageDirectory: "__testes__/coverage",

    coverageReporters: [
        "json",
        "lcov",
    ],

    testEnvironment: "node",

    testeMatch:[
    "<rootDir>/__tests__/**/*.spec.ts",
],

preset: '@shelf/jest-mongodb',

transform:{
    '^.*\\.ts': 'ts-jest'
},


}