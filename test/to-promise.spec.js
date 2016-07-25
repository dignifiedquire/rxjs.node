/* eslint-env mocha */
'use strict'

const expect = require('chai').expect
const Rx = require('rxjs/Rx')

const node = require('../src')

describe('toPromise', () => {
  it('receives a message', () => {
    const observable = Rx.Observable
            .of('hello')
            .map((x) => x + '!')

    return node.toPromise(observable)
      .then((res) => {
        expect(res).to.be.eql('hello!')
      })
  })

  it('receives errors', () => {
    const observable = Rx.Observable.throw('fail')
    return node.toPromise(observable)
      .catch((err) => {
        expect(err).to.be.eql('fail')
      })
  })
})
