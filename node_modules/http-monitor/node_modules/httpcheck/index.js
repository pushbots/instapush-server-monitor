var request = require('request')

// Default # of tries for test
var HTTP_CHECK_TRIES = 10

// Default interval in between HTTP checks in ms
var HTTP_CHECK_INTERVAL = 1000

// Default time to wait before timeout
var HTTP_CHECK_TIMEOUT = 30000

//
// **opts** an object with options
//  - url: URL to check
//  - check: Function to validate response object (default `response is truthy`)
//  - checkTries: Number of tries before failing the test (default 10)
//  - checkInverval: Interval between checks in milliseconds (default 1000)
//  - log: Custom log function, defaults to console.log
//
module.exports = function(opts, cb) {
  var checkTries = opts.checkTries
  if (opts.checkTries === undefined) {
    checkTries = HTTP_CHECK_TRIES
  }
  var checkInterval = opts.checkInterval
  if (opts.checkInterval === undefined) {
    checkInterval = HTTP_CHECK_INTERVAL
  }
  var checkTimeout = opts.checkTimeout
  if (opts.checkTimeout === undefined) {
    checkTimeout = HTTP_CHECK_TIMEOUT
  }
  var statusCheck = opts.check || function(response) {
    return response ? true : false
  }
  if (!opts.url) {
    throw new Error("you must specify a url property for your httpcheck")
  }
  var log = opts.log || console.log
  var tries = 0
  var check = function() {
    request(opts.url, {timeout:checkTimeout}, function(err, response) {
      tries++
      if (!err && statusCheck(response)) {
        log("Got HTTP GET on " + opts.url + " indicating server is up")
        return cb(null)
      } else {
        log("Error on " + opts.url + ": " + err)
        if (tries >= checkTries) {
          var msg = ("HTTP GET check on " + opts.url + " failed after " + tries
            + " tries, server not up - failing test")
          log(msg)
          return cb(msg, null)
        }
      }
      waitCheck()
    })
  }
  var waitCheck = function() {
    return setTimeout(check, checkInterval)
  }
  return waitCheck()
}
