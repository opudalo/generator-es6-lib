import polyfill from 'babel-polyfill'
import { expect }  from 'chai'
import <%= exportName %> from '../src/<%= baseFileName %>'


describe('<%= libName %> basics', function () {
  it('should exist', function () {
    expect(<%= exportName %>).to.be.function
  })
})
