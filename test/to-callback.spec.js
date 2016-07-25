/* eslint-env mocha */
'use strict'

const expect = require('chai').expect
const Rx = require('rxjs/Rx')

const node = require('../src')

describe('toCallback', () => {
  it('receives a message', (done) => {
    const observable = Rx.Observable
            .of('hello')
            .map((x) => x + '!')

    node.toCallback(observable, (err, res) => {
      expect(err).to.not.exist
      expect(res).to.be.eql('hello!')
      done()
    })
  })

  it('receives errors', (done) => {
    const observable = Rx.Observable.throw('fail')
    node.toCallback(observable, (err, res) => {
      expect(err).to.be.eql('fail')
      expect(res).to.not.exist
      done()
    })
  })
})
