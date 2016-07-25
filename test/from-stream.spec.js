/* eslint-env mocha */
'use strict'

const expect = require('chai').expect
const Readable = require('stream').Readable
const Writable = require('stream').Writable

const node = require('../src')

describe('fromStream', () => {
  describe('ReadableStream', () => {
    it('receive multiple messages', (done) => {
      const stream = new Readable()
      stream._read = () => {}

      const subject = node.fromStream(stream)
      const expected = [Buffer('hello'), Buffer('world'), Buffer('where?')]
      const results = []

      subject.subscribe(
        (msg) => results.push(msg),
        done,
        () => {
          expect(results).to.be.eql(expected)
          done()
        }
      )

      expected.forEach((msg) => stream.push(msg, 'utf8'))
      stream.push(null)

      subject.unsubscribe()
    })

    it('should allow the user to chain operators', (done) => {
      const stream = new Readable()
      stream._read = () => {}

      const subject = node.fromStream(stream)

      subject
        .map((x) => parseInt(x, 10) + 3)
        .map((x) => x * x)
        .subscribe(
          (msg) => {
            expect(msg).to.be.eql((10 + 3) * (10 + 3))
            done()
          }
        )

      stream.push('10')
      stream.push(null)

      subject.unsubscribe()
    })
  })

  describe('WritableStream', () => {
    it('queue writes', () => {
      const data = []
      const stream = new Writable()
      stream._write = (chunk, encoding, cb) => {
        data.push(chunk)
        cb()
      }

      const expected = [Buffer('hello'), Buffer('world')]
      const subject = node.fromStream(stream)

      expected.forEach((msg) => subject.next(msg))
      subject.subscribe()
      expect(data).to.be.eql(expected)
      subject.unsubscribe()
    })

    it('send writes immediately if subscribed', () => {
      const data = []
      const stream = new Writable()
      stream._write = (chunk, encoding, cb) => {
        data.push(chunk)
        cb()
      }

      const expected = [Buffer('hello'), Buffer('world')]
      const subject = node.fromStream(stream)
      subject.subscribe()

      expected.forEach((msg) => subject.next(msg))
      expect(data).to.be.eql(expected)
      subject.unsubscribe()
    })
  })
})
