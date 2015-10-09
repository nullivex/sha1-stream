'use strict';
var SHAStream = require('./helpers/SHAStream')


/**
 * Export the raw class
 * @type {SHAStream}
 */
exports.SHAStream = SHAStream


/**
 * Shorthand constructor
 * @param {string} hashType type of hash to create defaults to sha1
 * @return {SHAStream}
 */
exports.createStream = function(hashType){
  return new SHAStream(hashType)
}
