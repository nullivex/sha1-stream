'use strict';
var P = require('bluebird')
var expect = require('chai').expect
var fs = require('graceful-fs')

var promisePipe = require('../helpers/promisePipe')
var SHAStream = require('../helpers/SHAStream')

var content = require('./helpers/content')

var runTest = function(hashType){
  hashType = hashType || 'sha1'
  var sniff = new SHAStream(hashType)
  return promisePipe(fs.createReadStream(content.file),sniff)
    .then(function(){
      //check if the hashType value is set
      expect(sniff[hashType]).to.equal(content[hashType])
      //as of 0.2.0 we set .hash
      expect(sniff.hash).to.equal(content[hashType])
    })
}

describe('SHAStream',function(){
  it('should accept a stream and emit a hash',function(){
    var hash
    var hashType = 'sha1'
    var sniff = new SHAStream(hashType)
    sniff.on('digest',function(result){
      hash = result
    })
    return promisePipe(fs.createReadStream(content.file),sniff)
      .then(function(){
        expect(hash).to.equal(content[hashType])
      })
  })
  it('should accept a stream and store sha1',function(){
    return runTest()
  })
  it('should accept a stream and store sha256',function(){
    return runTest('sha256')
  })
  it('should accept a stream on emit a sha1 1000x',function(){
    var promises = []
    for(var i = 0; i < 1000; i++){
      promises.push(runTest())
    }
    return P.all(promises)
  })
})
