'use strict'

const Rx = require('rxjs/Rx')

const Subject = Rx.Subject
const AnonymousSubject = require('rxjs/Subject').AnonymousSubject
const Subscriber = Rx.Subscriber
const Subscription = Rx.Subscription
const ReplaySubject = Rx.ReplaySubject
const Observable = Rx.Observable

module.exports = class StreamSubject extends AnonymousSubject {
  constructor (optionsOrSource, destination) {
    if (destination instanceof Observable) {
      super(destination, optionsOrSource)
    } else {
      super()
      this._output = new Subject()

      Object.assign(this, optionsOrSource)

      this.destination = new ReplaySubject()
    }
  }

  // lift (operator) {
  //   console.log('lifting', this)
  //   const subj = new StreamSubject(this, this.destination)
  //   subj.operator = operator

  //   return subj
  // }

  unsubscribe () {
    if (this.stream) {
      this.stream.destroy && this.stream.destroy()
      this.stream.end && this.stream.end()
      this.stream = null
    }
    super.unsubscribe()

    if (!this.source) {
      this.destination = new ReplaySubject()
    }
  }

  _connectStream () {
    const stream = this.createStream()
    this.stream = stream

    const subscription = new Subscription(() => {
      this.stream = null
      if (stream) {
        stream.destroy && stream.destroy()
        stream.end && stream.end()
      }
    })

    const observer = this._output

    const createSubscription = () => {
      if (this.openObserver) {
        this.openObserver.next(this.stream)
      }

      const ender = () => {
        if (this.closingObserver) {
          this.closingObserver.next(undefined)
        }

        this.stream.destroy && this.stream.destroy()
        this.destination = new ReplaySubject()
        this.stream = null
      }

      const queue = this.destination

      this.destination = Subscriber.create(
        (x) => this.stream.writable && this.stream.write(x),
        ender,
        ender
      )

      if (queue && queue instanceof ReplaySubject) {
        subscription.add(queue.subscribe(this.destination))
      }
    }

    if (this.openEvent) {
      stream.on(this.openEvent, createSubscription)
    } else {
      createSubscription()
    }

    stream.on('error', (err) => observer.error(err))
    stream.on(this.endEvent, () => {
      const closeObserver = this.closeObserver

      if (closeObserver) {
        closeObserver.next(undefined)
      }

      observer.complete()
    })

    stream.on(this.dataEvent, (chunk) => {
      observer.next(chunk)
    })
  }

  _subscribe (subscriber) {
    const source = this.source
    if (source) {
      return source.subscribe(subscriber)
    }

    if (!this.stream) {
      this._connectStream()
    }

    const subscription = new Subscription()
    subscription.add(this._output.subscribe(subscriber))
    subscription.add(() => {
      let stream = this.stream
      if (stream) {
        stream.destroy && stream.destroy()
        stream.end && stream.end()
        stream = null
      }
    })

    return subscription
  }
}
