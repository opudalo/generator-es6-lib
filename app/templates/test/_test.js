import <%= exportName %> from '../src/<%= baseFileName %>'
import { expect }  from 'chai'

describe('<%= libName %> basics', function () {
  it('should exist', function () {
    expect(<%= exportName %>).to.be.function
  })
})
