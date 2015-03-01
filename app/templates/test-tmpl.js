import * as <%= exportName %> from './<%= baseFileName %>'
import {expect} from 'chai'


describe('<%= libName %> basics', function () {

  it('should have a working test harness', function () {
    expect(true).to.not.equal(false);
  });

  it('should exist', function () {
    expect(typeof <%= exportName %>).to.equal('object');
  })


})
