'use strict';
var SHA1Stream = require('./helpers/SHA1Stream')


/**
 * Export the raw class
 * @type {SHA1Stream|exports}
 */
exports.SHA1Stream = SHA1Stream


/**
 * Shorthand constructor
 * @return {SHA1Stream}
 */
exports.createStream = function(){
  return new SHA1Stream()
}
