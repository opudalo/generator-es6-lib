import 'babel/polyfill'
import <%= exportName %> from '../src/<%= baseFileName %>'
import {expect} from 'chai'

describe('<%= libName %> basics', function () {
  it('should exist', function () {
    expect(typeof <%= exportName %>).to.equal('function')
  })
})
