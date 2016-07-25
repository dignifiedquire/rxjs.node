'use strict'

module.exports = function toCallback (source, cb) {
  let called = false
  let val = null

  source.subscribe(
    (x) => {
      val = x
    },
    (err) => {
      if (!called) {
        called = true
        cb(err)
      }
    },
    () => {
      if (!called) {
        called = true
        cb(null, val)
      }
    }
  )
}
