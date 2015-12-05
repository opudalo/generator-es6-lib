import gulp from 'gulp'
import es6lib from 'es6-lib'

es6lib({
  gulp: gulp,
  rootDir: __dirname,
  testEnv: '<%= testEnvironment %>',
  <% if (es5mode) { %>
  es5mode: true
  <% } else { %>
  webpackNoParse: [/babel-polyfill/]
  <% } %>
})
