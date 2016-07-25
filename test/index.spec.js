/* eslint-env mocha */
'use strict'

const expect = require('chai').expect
const Readable = require('stream').Readable
const Writable = require('stream').Writable

const node = require('../src')

describe('rxjs.node', () => {
  describe('fromStream', () => {
    it('ReadableStream', (done) => {
      const stream = new Readable()
      stream._read = () => {}
      stream.push('hello')
      stream.push('world')
      stream.push(null)

      const observer = node.fromStream(stream)
      observer
        .map((chunk) => chunk.toString() + '!')
        .toArray()
        .subscribe((chunks) => {
          expect(
            chunks
          ).to.be.eql(
            ['hello!', 'world!']
          )
        }, done, done)
    })

    it('WritableStream', (done) => {
      const data = []
      const stream = new Writable()
      stream._write = (chunk, encoding, cb) => {
        console.log('writing', chunk)
        data.push(chunk)
        cb()
      }

      const expected = ['hello', 'world']
      const subject = node.fromStream(stream)
      expected.forEach((msg) => subject.next(msg))
      subject.subscribe()
      expect(data).to.be.eql(expected)
      subject.unsubscribe()
      done()
    })
  })
})
