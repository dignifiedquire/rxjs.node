'use strict'

const net = require('net')
const Rx = require('rxjs/Rx')

const StreamSubject = require('./stream-subject')

module.exports = class SocketSubject extends StreamSubject {
  constructor (optionsOrSource, destination) {
    if (destination instanceof Rx.Observable) {
      super(destination, optionsOrSource)
    } else {
      super({
        dataEvent: 'data',
        endEvent: 'close',
        openEvent: 'connect',
        openObserver: optionsOrSource.openObserver,
        closeObserver: optionsOrSource.closeObserver,
        closingObserver: optionsOrSource.closingObserver,
        createStream () {
          return net.connect(optionsOrSource)
        }
      })
      this._socketOptions = optionsOrSource
    }
  }
}
