import <%= exportName %> from '../src/<%= baseFileName %>'
import { chai }  from 'es6-lib'

let {expect} = chai

describe('<%= libName %> basics', function () {
  it('should exist', function () {
    expect(<%= exportName %>).to.be.function
  })
})
