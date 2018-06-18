'use strict';
var P = require('bluebird')

var events = ['error', 'end', 'close', 'finish']
var mappedEvents = []

function cleanupEventHandlers(errorMessage) {
  if(errorMessage){
    mappedEvents.forEach(function(row,i){
      if('error' !== row.event){
        row.obj.removeListener(row.event,row.listener)
        delete mappedEvents[i]
      }
    })
  } else {
    mappedEvents.forEach(function(row,i){
      if('end' !== row.event){
        row.obj.removeListener(row.event,row.listener)
        delete mappedEvents[i]
      }
    })
  }
}

function streamPromise(streams, i) {
  var stream = streams[i]
  if(stream === process.stdout || stream === process.stderr){
    return P.resolve(stream)
  }
  function on(evt) {
    function executor(resolve, reject){
      function fn(message){
        if('error' === evt){
          console.log('PromisePipe got ' + evt + ':' + message)
          cleanupEventHandlers(message)
          reject(new Error(message,stream))
        } else {
          resolve(stream)
        }
      }
      stream.on(evt,fn)
      mappedEvents.push({obj: stream,event: evt,listener: fn})
    }
    return new P(executor)
  }
  return P.race(events.map(on))
}

module.exports = function promisePipe() {
  var allStreams = []
  for(var arg in arguments){
    if(arguments.hasOwnProperty(arg)) allStreams.push(arguments[arg])
  }
  allStreams.reduce(function(current,next){
    if(current && next && current.pipe) current.pipe(next)
  })
  return P.all(allStreams.map(
    function(value,i){return streamPromise(allStreams,i)}
  )).then(function(streams){
    cleanupEventHandlers()
    return streams;
  })
}
