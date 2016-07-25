'use strict'

const StreamSubject = require('./stream-subject')

module.exports = function fromStream (source) {
  return new StreamSubject({
    dataEvent: 'data',
    endEvent: 'end',
    createStream () {
      return source
    }
  })
}
