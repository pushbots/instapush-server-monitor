var check = require('../index.js')
var expect = require('chai').expect
var http = require('http')
var url = require('url')

describe('httpcheck', function() {

  it('should throw exception without url property', function(done) {
    expect(check).to.throw(Error)
    done()
  })

  it('should fail with invalid server', function(done) {
    var gotLog = false
    var opts = {
      url:"http://localhost:78912/foo",
      checkTries:1,
      // silence logs
      log: function(msg) {
        gotLog = true
      }
    }
    check(opts, function(err) {
      expect(err).to.exist
      expect(gotLog).to.be.true
      done()
    })
  })

  describe('#integration test', function(done) {
    var port = 76515
    // Simple test server
    var server = http.createServer(function(req, res) {

      var uri = url.parse(req.url)

      if (uri.pathname === "/500") {
        res.writeHead(500, {"Content-Type": "text/plain"})
        return res.end()
      }

      if (uri.pathname === "/200") {
        res.writeHead(200, {"content-type": "text/plain"})
        res.write("ok")
        return res.end()
      }

      if (uri.pathname === "/404") {
        res.writeHead(404, {"Content-Type": "text/plain"})
        res.write("not found")
        return res.end()
      }

    })

    before(function(done) {
      server.listen(port)
      done()
    })

    after(function(done) {
      server.close()
      done()
    })

    it('should connect to real server and pass on 200 OK', function(done) {
      check({url:"http://localhost:" + port + "/200",
        checkTries:1, log:function() {}},
        function(err) {
          expect(err).to.be.null
          done()

      })
    })

    it('should retry within alotted time', function(done) {
      server.close()
      this.timeout(6000)
      setTimeout(function() {
        server.listen(port)
      }, 4000)
      check({url:"http://localhost:" + port + "/200",
        checkTries:5, log:function() {}},
        function(err) {
          expect(err).to.be.null
          done()
      })
    })

    it('should support custom check function success', function(done) {
      check({url:"http://localhost:" + port + "/404",
        checkTries:1, log:function() {}, 
        check:function(res) {
          if (res && res.statusCode === 404) {
            return true
          }
          return false
        }
      },
        function(err) {
          expect(err).to.be.null
          done()
      })
    })

    it('should support custom check function failure', function(done) {
      check({url:"http://localhost:" + port + "/500",
        checkTries:1, log:function() {}, 
        check:function(res) {
          if (res && res.statusCode === 200) {
            return true
          }
          return false
        }
      },
        function(err) {
          expect(err).to.exist
          done()
      })
    })

  })

})
