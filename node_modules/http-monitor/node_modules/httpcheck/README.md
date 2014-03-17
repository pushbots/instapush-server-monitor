## node-httpcheck

Simple HTTP status checker w/ timeout.

## Installation

`npm install httpcheck`

## Usage

Very simple example to merely check that http://example.com returns a valid
HTTP response of some kind:

```javascript

var check = require('httpcheck')


check({url:"http://example.com"}, function(err) {
    if (err) {
        console.log("HTTP check for example.com failed!")
        throw err
    }
    console.log("HTTP check for example.com has passed")
})

```

Check that http://example.com/404 returns a HTTP response with status code 404
and give it at most 3 tries.

```javascript

var check = require('httpcheck')

check({url:"http://example.com/404",
  checkTries:3,
  check:function(res) {
    if (res && res.statusCode === 404) {
      return true
    }
    return false
  }
},
  function(err) {
    if (err) {
        console.log("HTTP check for example.com failed!")
        throw err
    }
    console.log("HTTP check for example.com has passed")
})


```


## API

`httpcheck` takes a small number of parameters:

function(opts, cb)

`opts` is an object with properties:

- `url`: URL to run HTTP check against. Required.
- `checkTries`: Number of times to try the HTTP check. Default is 10.
- `checkInterval`: Interval between HTTP check tries in ms. Default is 1000ms (1 second)
- `checkTimeout`: Timeout for the HTTP check in ms. Default is 30000ms (30 seconds)
- `check`: Custom check function which accepts a HTTP response object and returns
`true` or `false` on success or failure. Default is that response object is truthy.
- `log`: Custom log function. Default is `console.log`.

`cb` is a function callback which takes a single parameter indicating error.

## Tests

`httpcheck` [has tests](https://github.com/niallo/node-httpcheck/blob/master/test/test.js). Execute `npm test` to run them.

## License

`httpcheck` is released under the BSD license.

