var chai = require('chai'),
  expect = chai.expect,
  <%= exportName %> = require('../src/<%= baseFileName %>')


describe('<%= libName %> basics', function () {
  it('should exist', function () {
    expect(<%= exportName %>).to.be.function
  })
})
