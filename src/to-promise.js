'use strict'

module.exports = function toPromise (source) {
  return new Promise((resolve, reject) => {
    let val = null

    source.subscribe(
      (x) => {
        val = x
      },
      (err) => reject(err),
      () => resolve(val)
    )
  })
}
