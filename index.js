'use strict';
var SHAStream = require('./helpers/SHAStream')


/**
 * Export the raw class
 * @type {SHA1Stream|exports}
 */
exports.SHAStream = SHAStream


/**
 * Shorthand constructor
 * @param {string} hashType type of hash to create defaults to sha1
 * @return {SHA1Stream}
 */
exports.createStream = function(hashType){
  return new SHAStream(hashType)
}
