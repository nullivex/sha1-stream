sha1-stream [![Build Status](https://travis-ci.org/snailjs/sha1-stream.svg?branch=master)](https://travis-ci.org/snailjs/sha1-stream)
===========

Node Hashing Stream library

## Usage

```js
var fs = require('fs')
var shastream = require('sha1-stream')

//create a new stream
var sniff = shastream.createStream('sha256')
sniff.on('digest',function(result){
  console.log(result) //a03f181dc7dedcfb577511149b8844711efdb04f
})

//pipe something into the stream
fs.createReadStream('myfile.txt').pipe(sniff)
```

## Changelog

### 0.2.0
* Add support for any hash instead of SHA1. Could pose a package rename.

### 0.1.0
* Initial Release
