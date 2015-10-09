'use strict';
var crypto = require('crypto')
var Transform = require('stream').PassThrough
var util = require('util')



/**
 * Constructor
 * @constructor
 * @param {string} hash type defaults to sha1
 * @param {object} options
 */
var SHAStream = function(hashType,options){
  var that = this
  that.hashType = hashType || 'sha1'
  Transform.call(that,options)
  that.sum = crypto.createHash(that.hashType)
  that[that.hashType] = null
  that.on('finish',function(){
    that.hash = that.sum.digest('hex')
    that[that.hashType] = that.hash
    that.emit('digest',that[that.hashType])
    that.emit(that.hashType,that[that.hashType])
  })
}
util.inherits(SHAStream,Transform)


/**
 * Transform data
 * @param {Buffer} chunk
 * @param {string} encoding
 * @param {function} done
 */
SHAStream.prototype._transform = function(chunk,encoding,done){
  try {
    this.sum.update(chunk)
    this.push(chunk)
    done()
  } catch(e){
    done(e)
  }
}


/**
 * Export helper
 * @type {SHAStream}
 */
module.exports = SHAStream
