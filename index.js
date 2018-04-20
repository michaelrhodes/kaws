module.exports = kaws

function kaws (url, opts) {
  opts = opts || {}

  var kaws = {}
  var proto = {}
  var max = opts.maxAttempts || Infinity
  var ms = opts.timeout || 1e3
  var restarts, ws, k

  kaws.open = function () {
    ws = kaws.ws = new WebSocket(url, opts.protocols)
    for (k in proto) ws[k] = proto[k]
  }

  kaws.reconnect = function (e) {
    restarts++ < max ? setTimeout(function () {
      kaws.onreconnect && kaws.onreconnect(e)
      kaws.open()
    }, ms) : (
      kaws.onmaximum && kaws.onmaximum(e)
    )
  }

  kaws.send = function (msg) {
    ws.send(msg)
  }

  kaws.close = function (x, y) {
    ws.close(x, y)
  }

  proto.onmessage = function (e) {
    kaws.onmessage && kaws.onmessage(e)
  }

  proto.onclose = function (e) {
    (e.code !== 1e3 && e.code !== 1005) && kaws.reconnect(e)
    kaws.onclose && kaws.onclose(e)
  }

  proto.onerror = function (e) {
    e && e.code === 'ECONNREFUSED' ?
      kaws.reconnect(e) :
     (kaws.onerror && kaws.onerror(e))
  }

  proto.onopen = function (e) {
    restarts = 0
    kaws.onopen && kaws.onopen(e)
  }

  kaws.open()

  return kaws
}

function noop () {}
