// NOTE must be es5
var es6lib = require('es6-lib')
var gulp = require('gulp')

es6lib({
  gulp: gulp,
  rootDir: __dirname,
  testEnv: '<%= testEnvironment %>'
})
