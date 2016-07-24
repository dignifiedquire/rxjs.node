/* eslint-env mocha */
'use strict'

const expect = require('chai').expect
const fs = require('fs')

const node = require('../src')

describe('rxjs.node', () => {
  describe('fromStream', () => {
    it('ReadableStream', () => {
      const source = fs.createReadStream('./test-data/hello.txt')
      const sub = node.fromStream(source)
              .subscribe((chunk) => {
                expect(
                  chunk
                ).to.be.eql(
                  new Buffer('hello world\nwhat is happening?\n')
                )
              })
    })
  })
})
